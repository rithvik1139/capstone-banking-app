function SpaHome() {
  const userContext = React.useContext(UserContext);
  const [state, setState] = React.useState(false);

  function getNavBar() {
    if (!userContext.loggedIn) {
      return <NavBarBasic />;
    } else {
      return <NavBar />;
    }
  }

  return (
    <HashRouter>
      <div>
        {getNavBar()}
        <div className="container" style={{ padding: "20px" }}>
          <Route
            path="/login/"
            exact
            render={(state) => <Login stateChanger={setState} />}
          />
          <Route path="/newUser/" exact component={CreateUser} />
          <Route path="/userProfile/" exact component={UserProfile} />
          <Route path="/newTransaction/" exact component={NewTransaction} />
          <Route path="/transactions/" exact>
            <Transactions setStateChanger={setState} />
          </Route>
          <Route path="/logout/" exact component={Logout} />
          <Route path="/" exact component={Login} />
        </div>
      </div>
    </HashRouter>
  );
}
