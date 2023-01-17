function CreateUser() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <div>
      <div className="row">
        <br />
        <br />
        <br />
      </div>
      <div className="row d-flex justify-content-center">
        <h1>WELCOME</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <p>to RK BANK</p>
      </div>

      <div className="col d-flex justify-content-center">
        <Card
          bgcolor="primary"
          header="Create Account"
          headertextsize="6"
          status={status}
          body={
            show ? (
              <CreateForm setShow={setShow} setStatus={setStatus} />
            ) : (
              <CreateMsg setShow={setShow} />
            )
          }
        />
      </div>

      <div className="col d-flex justify-content-center">
        <p>Already Have an Account?</p>
      </div>
      <div className="col d-flex justify-content-center">
        <Link to="/login/">Login Here</Link>
      </div>
    </div>
  );
}

function CreateMsg(props) {
  return (
    <>
      Success! Account created!
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Register Another
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validate(field, label) {
    if (!field) {
      props.setStatus("Error: " + label);
      setTimeout(() => props.setStatus(""), 5000);
      return false;
    }
    if (password.length < 8) {
      props.setStatus("Error: password must be at least 8 characters");
      setTimeout(() => props.setStatus(""), 5000);
      return false;
    }
    return true;
  }

  function handleCreateUser() {
    if (!validate(name, "enter your name")) return;
    if (!validate(email, "enter your email")) return;
    if (!validate(password, "enter a password")) return;

    const url = `/user/create`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };
    (async () => {
      var res = await fetch(url, requestOptions);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
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
      <button
        type="submit"
        className="btn btn-light"
        onClick={handleCreateUser}
      >
        Create Account
      </button>
    </>
  );
}
