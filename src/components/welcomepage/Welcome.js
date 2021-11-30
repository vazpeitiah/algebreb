import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = ({ user }) => {
  return (
    <div className="container my-lg-auto fill-welcome d-flex align-items-center position-relative overflow-hidden text-center text-dark animate__animated animate__fadeInUp">
      <div className=" p-lg-5 mx-auto">
        <p className="h1 pt-5 pb-3">Bienvenido {user.name}</p>

        <div className="row align-items-center my-5 pt-5">
          {user.roles && user.roles.includes("profesor") ? (
            <>
              <div className="col-md-6 col-lg-4 p-4">
                <Icon.FileEarmarkFill
                  className="bi bi-collection text-muted flex-shrink-0 mb-3"
                  size="3em"
                />
                <p className="h5">Administra hojas</p>
                <p>
                  Crea, edita y elimina hojas de ejercicios, tareas y examanes.
                  <br />
                  Exporta a pdf, latex o imágen.
                </p>
                <Link
                  to={"/sheets"}
                  className="btn btn-primary btn-lg bg-btn h5"
                >
                  Ver mas
                </Link>
              </div>

              <div className="col-md-6 col-lg-4 p-4">
                <Icon.PeopleFill
                  className="bi bi-collection text-muted flex-shrink-0 mb-3"
                  size="3em"
                />
                <p className="h5">Administra grupos</p>
                <p>Crea, califica y elimina grupos.</p>
                <Link
                  to={"/groups"}
                  className="btn btn-primary btn-lg bg-btn h5"
                >
                  Ver mas
                </Link>
              </div>

              <div className="col-md-6 col-lg-4 p-4">
                <Icon.CalculatorFill
                  className="bi bi-collection text-muted flex-shrink-0 mb-3"
                  size="3em"
                />
                <p className="h5">Genera examanes y tareas</p>
                <p>Crea examenes y tareas para los grupos con tiempo límite.</p>
                <Link
                  to={"/evaluations"}
                  className="btn btn-primary btn-lg bg-btn h5"
                >
                  Ver mas
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-6 col-lg-4 p-4">
                <Icon.FileEarmarkFill
                  className="bi bi-collection text-muted flex-shrink-0 mb-3"
                  size="3em"
                />
                <p className="h5">Administra hojas</p>
                <p>
                  Crea, edita y elimina hojas de ejercicios.
                  <br /> Exporta a pdf, latex o imágen.
                </p>
                <Link
                  to={"/sheets"}
                  className="btn btn-primary btn-lg bg-btn h5"
                >
                  Ver mas
                </Link>
              </div>

              <div className="col-md-6 col-lg-4 p-4">
                <Icon.CalculatorFill
                  className="bi bi-collection text-muted flex-shrink-0 mb-3"
                  size="3em"
                />
                <p className="h5">Administra grupos</p>
                <p>
                  Revisa los grupos inscritos y tus calificaciones en ellos.
                </p>
                {user && user.roles.includes("profesor") ? (
                  <Link
                    to={"/groups"}
                    className="btn btn-primary btn-lg bg-btn h5"
                  >
                    Ver mas
                  </Link>
                ) : (
                  <Link
                    to={"/student_groups"}
                    className="btn btn-primary btn-lg bg-btn h5"
                  >
                    Ver mas
                  </Link>
                )}
              </div>

              <div className="col-md-6 col-lg-4 p-4">
                <Icon.CalculatorFill
                  className="bi bi-collection text-muted flex-shrink-0 mb-3"
                  size="3em"
                />
                <p className="h5">Responde examenes y tareas</p>
                <p>
                  Resuelve examenes y tareas de tus grupos, en un tiempo
                  determinado.
                </p>
                <Link
                  to={"/student_evaluations"}
                  className="btn btn-primary btn-lg bg-btn h5"
                >
                  Ver mas
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
