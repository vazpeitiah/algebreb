import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = ({user}) => {
  return (
    <div className="container my-lg-auto fill-welcome d-flex align-items-center position-relative overflow-hidden text-center text-dark">
      <div className=" p-lg-5 mx-auto">
        <p className="h1 pt-5 pb-3">Bienvenido {user.name}</p>

        <div className="row align-items-center my-5 pt-5">
          {user.roles && user.roles.includes("profesor") ? (
            <div className="col-md-6 col-lg-4 p-4">
              <Icon.PeopleFill
                className="bi bi-collection text-muted flex-shrink-0 mb-3"
                size="3em"
              />
              <p className="h5">Administrar grupos.</p>
              <p>Crea, organiza, califica y elimina grupos.</p>
              <Link to={"/groups"} className="btn btn-primary btn-lg bg-btn h5">
                Ver mas
              </Link>
            </div>
          ) : (
            <div className="col-md-6 col-lg-4 p-4">
              <Icon.CalculatorFill
                className="bi bi-collection text-muted flex-shrink-0 mb-3"
                size="3em"
              />
              <p className="h5">Resuelve ejercicios.</p>
              <p>Realiza hojas de ejercicios, tareas y/o examenes.</p>
              {user && user.roles.includes('profesor') ? (
                <Link to={"/groups"} className="btn btn-primary btn-lg bg-btn h5">
                  Ver mas
                </Link>
              ): (
                <Link to={"/student_groups"} className="btn btn-primary btn-lg bg-btn h5">
                  Ver mas
                </Link>
              )}
            </div>
          )}

          <div className="col-md-6 col-lg-4 p-4">
            <Icon.FileEarmarkFill
              className="bi bi-collection text-muted flex-shrink-0 mb-3"
              size="3em"
            />
            <p className="h5">Administrar hojas</p>
            <p>
              Crea, edita y elimina hojas de ejercicios, tareas y examanes.
              Exporta a pdf, latex o imágen.
            </p>
            <Link to={"/sheets"} className="btn btn-primary btn-lg bg-btn h5">
              Ver mas
            </Link>
          </div>
          <div className="col-md-6 col-lg-4 p-4">
            <Icon.CalculatorFill
              className="bi bi-collection text-muted flex-shrink-0 mb-3"
              size="3em"
            />
            <p className="h5">Generar ejercicios</p>
            <p>Genera ejercicios con solucion paso a paso o solución final.</p>
            <Link to={"/sheets"} className="btn btn-primary btn-lg bg-btn h5">
              Ver mas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
