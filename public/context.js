const Route = ReactRouterDOM.Route;
const Routes = ReactRouterDOM.Routes;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const Navigate = ReactRouterDOM.Navigate;

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    //    const txtsize = props.headertxtsize ? ' display-' + props.headertxtsize: ' display-1';
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "18rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        <br />
        <br />
        {props.status && (
          <div className="text-warning" id="status">
            {props.status}
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SpaHome />);
