function UserProfile() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const userContext = React.useContext(UserContext);

  if (userContext.loggedIn == true) {
    return (
      <div>
        <div className="row">
          <br />
          <br />
          <br />
        </div>

        <div className="col d-flex justify-content-center">
          <Card
            bgcolor="dark"
            header="Update Profile"
            headertextsize="6"
            status={status}
            body={
              show ? (
                <UpdateProfile setShow={setShow} setStatus={setStatus} />
              ) : (
                <UpdateProfileMsg setShow={setShow} setStatus={setStatus} />
              )
            }
          />
        </div>
      </div>
    );
  } else {
    window.location.href = "./#/login";
    window.location.reload();
  }
}

function UpdateProfileMsg(props) {
  props.setStatus("");
  return <>Success! Profile Updated!</>;
}

function UpdateProfile(props) {
  const userContext = React.useContext(UserContext);
  const [name, setName] = React.useState(userContext.name);
  const [email, setEmail] = React.useState(userContext.email);
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  function handleUpdateUser() {
    if (password1 === password2) {
      const url = `/user/update`;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userContext.id,
          name: name,
          email: email,
          password: password1,
        }),
      };
      (async () => {
        var res = await fetch(url, requestOptions);
        var data = await res.json();
        console.log(data);
      })();
      props.setShow(false);
    } else {
      props.setStatus("Fail! Passwords do not match.");
    }
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
      Enter New Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password1}
        onChange={(e) => setPassword1(e.currentTarget.value)}
      />
      <br />
      Confirm New Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password2}
        onChange={(e) => setPassword2(e.currentTarget.value)}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handleUpdateUser}
      >
        Update Profile
      </button>
    </>
  );
}
