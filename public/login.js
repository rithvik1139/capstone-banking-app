function Login({ stateChanger }) {
  const [status, setStatus] = React.useState("");
  const userContext = React.useContext(UserContext);
  
  if (userContext.loggedIn == false) {
    return (
      <div>
        <div className="row">
          <br />
          <br />
          <br />
        </div>
        <div className="row d-flex justify-content-center">
          <h1 className="text-light">WELCOME</h1>
        </div>
        <div className="row d-flex justify-content-center">
          <p>to RK BANK</p>
        </div>

        <div className="col d-flex justify-content-center">
          <Card
            bgcolor="dark"
            header="Login"
            status={status}
            body={
              <LoginForm setStatus={setStatus} refreshPage={stateChanger}/>
            }
          />
        </div>

        <div className="col d-flex justify-content-center">
          <p>Not Registered Yet?</p>
        </div>
        <div className="col d-flex justify-content-center">
          <Link to="/newUser/">Sign Up Now</Link>
        </div>
      </div>
    );
  } else {
    window.location.href = './#/transactions';
  }
}

function LoginForm(props) {
  const userContext = React.useContext(UserContext);
  let [email, setEmail] = React.useState(userContext.email);
  let [password, setPassword] = React.useState(userContext.password);

  function handleLogin() {
    const url = `http://localhost:3000/user/login/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);

      if (data.name == "Unknown") {
        props.setStatus("Error: Email or Password is incorrect.");
      } else {
        userContext.loggedIn = true;
        userContext.id = data._id;
        userContext.name = data.name;
        userContext.email = data.email;
        userContext.password = data.password;
        userContext.balance = data.balance;
        console.log("New User Context: " + JSON.stringify(userContext));
        alert("You are now logged in!");
        window.location.href = './#/transactions';
      }
    })();
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handleLogin}>
        Login
      </button>
    </>
  );
}
