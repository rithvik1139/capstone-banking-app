// DATA ABSTRACTION LAYER (dal)

const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const url = "mongodb://192.168.212.200:35500";
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to db server");

  // connect to database
  db = client.db("RKBank");
});

// create user account
function createUser(newName, newEmail, newPassword) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = {
      name: newName,
      email: newEmail,
      password: newPassword,
      balance: 0,
    };
    collection.insertOne(doc, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
}

// update user profile
function updateUser(userId, updatedName, updatedEmail, updatedPassword) {
    return new Promise((resolve, reject) => {
        const updateUser = db
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(userId) },
          { $set: { name: updatedName, email: updatedEmail, password: updatedPassword } },
          { returnOriginal: false },
          function (err, document) {
            err ? reject(err) : resolve(document);
          }
        );
    });
  }

// find user by email, password for login
function getUserByEmailPwd(useremail, pwd) {
  return new Promise((resolve, reject) => {
    const user = db
      .collection("users")
      .findOne({ email: useremail, password: pwd })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// find user by userId for transactions
function getTransactionsByUserId(userId) {
  return new Promise((resolve, reject) => {
    const trans = db
      .collection("transactions")
      .find({ userId: ObjectId(userId) })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

// update balance according to deposit or withdraw
function updateBalance(userId, amount, type) {
  let reqAmount = parseFloat(amount);

  reqAmount = reqAmount < 0 ? reqAmount * -1 : reqAmount;
  if (type == "Withdraw") {
    return new Promise((resolve, reject) => {
      const user = db
        .collection("users")
        .findOne({ _id: ObjectId(userId) })
        .then((doc) => {
          if (doc.balance < reqAmount) {
            const errorDoc = {
              errorId: 101,
              error:
                "Cannot withdraw amount!  Withdraw request exceeds balance.",
            };
            resolve(errorDoc);
          } else {
            reqAmount *= -1; // withdraw
            resetBalance(userId, reqAmount).then((doc) => {
              resolve(doc);
            });
          }
        })
        .catch((err) => reject(err));
    });
  } else { // deposit
    return new Promise((resolve, reject) => {
      resetBalance(userId, reqAmount).then((doc) => {
        resolve(doc);
      });
    });
  }
}

// reset balance
function resetBalance(userId, amount) {
  return new Promise((resolve, reject) => {
    const balance = db
      .collection("users")
      .findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, document) {
          err ? reject(err) : resolve(document);
        }
      );
  });
}

// create deposit/withdraw transaction
function createTransactionInDB(userId, newAmount, newType) {
  return new Promise((resolve, reject) => {

    const transaction = db.collection("transactions");
    const trans = {
      userId: ObjectId(userId),
      dateTime: getCurrentDate(),
      amount: parseFloat(newAmount),
      type: newType,
    };
    transaction.insertOne(trans, function (err, result) {
      if (err) {
        reject(err);
      } else {
        let user = new Promise((resolve, reject) => {
          updateBalance(userId, "0" + newAmount, newType).then((doc) => {
            resolve(doc);
          });
        });
        resolve(result);
      }
    });
  });
}

function getCurrentDate(separator = "/") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let dateStr = `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;

  return (
    dateStr +
    " " +
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds() +
    ":" +
    newDate.getUTCMilliseconds() +
    " " +
    newDate.getTimezoneOffset()
  );
}

module.exports = {
  createUser,
  updateUser,
  getUserByEmailPwd,
  getTransactionsByUserId,
  updateBalance,
  createTransactionInDB,
};
