function NavBar(){
  const userContext = React.useContext(UserContext);
  
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">RK BANK</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/transactions/">AllTransactions</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/newTransaction/">NewTransaction</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/userProfile/">UserProfile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/logout/">Logout</a>
          </li>
        </ul>
        <span className="navbar-text ml-auto">
            Welcome {userContext.name}!
        </span>
      </div>
    </nav>
  );
}
