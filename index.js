var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js')
const bodyParser = require("body-parser");

// serve static files from public directory
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// create user account now using data abstraction layer (dal) (in order to separate data-specific code from the node application. This makes it easier to change databases as well)
app.post('/user/create', function(req, res){
    dal.createUser(req.body.name, req.body.email, req.body.password).
    then((user) => {
        res.send(user);
    });
});

// update user info
app.put('/user/update', function(req, res){
    dal.updateUser(req.body.userId, req.body.name, req.body.email, req.body.password)
    .then((updatedUserInfo) => {
       res.send(updatedUserInfo);
    });
});

// login user
app.get('/user/login/:email/:password', function(req, res){
    dal.getUserByEmailPwd(req.params.email, req.params.password).
    then((userDoc) => {
        if (JSON.stringify(userDoc)=='null') {
            userDoc = {
                _id: '',
                name: 'Unknown',
                email: '',
                password: '',
                balance: -1,
              };
       }
       res.send(userDoc);
    });
});

// get transactions by userId specified
app.get('/account/transactions/:userId', function(req, res){
    dal.getTransactionsByUserId(req.params.userId)
    .then((transDoc) => {
        if (JSON.stringify(transDoc)=='null') {
            transDoc = {
                _id: '',
                user: 'Unknown',
                dateTime: '',
                amount: '',
                type: '',
              };
       }
       res.send(transDoc);
    });
});

// update the balance
app.put('/account/balance', function(req, res){
    dal.updateBalance(req.body.userId, req.body.amount, req.body.type)
    .then((newBalanceDoc) => {
       res.send(newBalanceDoc);
    });
});

// add transaction to transaction database
app.post('/account/addTransaction', function(req, res){
    dal.createTransactionInDB(req.body.userId, req.body.amount, req.body.type)
    .then((trans) => {
        res.send(trans);
    });
});

// return all transactions
app.get('/account/transactions', function(req, res){
    dal.transactions().
    then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

var port = 30005;
app.listen(port);
console.log('Running on port: ' + port);