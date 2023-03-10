function Transactions({ setStateChanger }) {
  const userContext = React.useContext(UserContext);
  let [transactions, setTrans] = React.useState();

  if (transactions == null) {
    getTransactions();
    setStateChanger(true);
  }

  function getTransactions() {
    console.log("ID: " + userContext.id);
    const url = `/account/transactions/${userContext.id}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();

      transactions = setTrans(data);
    })();
  }

  function depositAmount(type, amount) {
    return type == "Deposit" ? "$" + amount : "";
  }

  function withdrawAmount(type, amount) {
    return type == "Withdraw" ? "$" + amount : "";
  }
  let runBalance = 0;
  function runningBalance(type, amount) {
    if (type == "Deposit") {
      runBalance += parseFloat(amount);
    } else {
      runBalance -= parseFloat(amount);
    }
    return "$" + runBalance;
  }

  let counter = 0;

  if (transactions == null) {
    if (userContext.loggedIn == false) {
      window.location.href = "./#/login";
      window.location.reload();
    }
  } else {
    return (
      <div>
        <div className="row">
          <br />
          <br />
          <br />
        </div>

        <div className="col d-flex justify-content-center">
          <div className="row">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Your Transactions</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Item</th>
                      <th> Deposit </th>
                      <th> Withdraw </th>
                      <th> Balance </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((trans) => (
                      <tr key={trans._id}>
                        <td> {++counter}</td>
                        <td style={{ width: "70%", whiteSpace: "nowrap" }}>
                          {trans.type + " on " + trans.dateTime}
                        </td>
                        <td
                          className="text-success"
                          style={{ textAlign: "right" }}
                        >
                          {depositAmount(trans.type, trans.amount)}
                        </td>
                        <td
                          className="text-danger"
                          style={{ textAlign: "right" }}
                        >
                          {withdrawAmount(trans.type, trans.amount)}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {runningBalance(trans.type, trans.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
