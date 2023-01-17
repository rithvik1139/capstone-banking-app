function Logout() {
  const userContext = React.useContext(UserContext);

  function handleLogout() {
    userContext.loggedIn = false;
    userContext.id = "";
    alert("You are now logged out!");
    window.location.href = "./#/login";
    window.location.reload();
  }

  if (userContext.loggedIn == true) {
    return (
      <div>
        <div className="row">
          <br />
          <br />
          <br />
        </div>
        <div className="row d-flex justify-content-center">
          <Card
            bgcolor="warning"
            header="Logout"
            text="Now Leaving RK BANK"
            headertextsize="6"
            body={
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleLogout}
              >
                Logout
              </button>
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
