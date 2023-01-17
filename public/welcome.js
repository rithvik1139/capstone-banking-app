function SpaWelcome({loggedInUserIdChanger}) {
  return (
    <HashRouter>
      <div>
        <NavBarBasic />
        <div className="container" style={{ padding: "20px" }}>
        <Route path="/login/" exact component={Login} />
        <Route path="/" component={SpaHome} />
        </div>
      </div>
    </HashRouter>
  );
}
