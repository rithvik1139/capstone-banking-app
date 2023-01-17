function NewTransaction() {
  const [show, setShow] = React.useState("form");
  const [status, setStatus] = React.useState("");
  const userContext = React.useContext(UserContext);

  if (userContext.id == "") {
    setShow("login");
  }

  function switchScreen() {
    switch (show) {
      case "form":
        return <TransactionForm setShow={setShow} setStatus={setStatus} />;
      case "success":
        return <TransactionMsg setShow={setShow} />;
      case "login":
        window.location.href = "./#/login";
        window.location.reload();
        break;
    }
  }

  return (
    <div>
      <div className="row">
        <br />
        <br />
        <br />
      </div>
      
      <div className="col d-flex justify-content-center">
        <Card
          bgcolor="warning"
          header="Transaction"
          status={status}
          body={switchScreen()}
        />
      </div>
    </div>
  );
}

function TransactionMsg(props) {
  return (
    <>
      <h5>Success!</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow("form")}
      >
        Make Another Transaction
      </button>
    </>
  );
}

function TransactionForm(props) {
  const [amount, setAmount] = React.useState(0.0);
  const [transactionType, setTransactionType] = React.useState("Deposit");
  const userContext = React.useContext(UserContext);

  function handleTransaction() {
    let userId = userContext.id;

    if (userId == "") {
      window.location.href = "./#/login";
    } else {
      const url = `/account/addTransaction`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          amount: amount,
          type: transactionType,
        }),
      };
      (async () => {
        var res = await fetch(url, requestOptions);
      })();
      props.setStatus("");
      props.setShow("success");
    }
  }

  return (
    <>
      Transaction Amount:
      <br />
      <input
        type="number"
        min="0.00"
        max="500.00"
        className="form-control"
        placeholder="Enter transaction amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      Transaction Type:
      <br />
      <select
        className="btn btn-light dropdown-toggle"
        onChange={(e) => setTransactionType(e.currentTarget.value)}
      >
        <option defaultValue="Deposit">Deposit</option>
        <option value="Withdraw">Withdraw</option>
      </select>
      <br />
      <br />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handleTransaction}
      >
        Submit
      </button>
    </>
  );
}
