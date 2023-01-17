const ctx = {
  user: {
    id:'',
        loggedIn:false,
        name:'',
        email:'',
        password:'',
        balance:0,
  }
};

const UserContext = React.createContext(
  ctx.user
);

