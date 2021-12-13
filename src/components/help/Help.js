import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import { SheetHelp } from "./SheetHelp";
import { LogHelp } from "./LogHelp";
import { GroupHelp } from "./GroupHelp";
import { EvaluationHelp } from "./EvaluationHelp";
import "./Help.css";

const Help = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div className="col-2 bg-algebreb-dark text-white">
          <nav className="navbar p-3 ps-4" style={{position: "fixed"}}>
            <ul className="navbar-nav">
              <h4>Ayuda</h4>
              <hr />
              <li className="nav-item">
                <Link className="nav-link help-link" to="/log_help">
                  Ingreso a la aplicación
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link help-link" to="/sheet_help">
                  Hojas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link help-link" to="/group_help">
                  Grupos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link help-link" to="/evaluation_help">
                  Evaluaciones
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="container pt-2 pb-5">
          <Switch>
            <Route exact path="/log_help">
              <LogHelp />
            </Route>
            <Route path="/sheet_help">
              <SheetHelp />
            </Route>
            <Route path="/group_help">
              <GroupHelp />
            </Route>
            <Route path="/evaluation_help">
              <EvaluationHelp />
            </Route>
            <Redirect to="/log_help" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Help;
