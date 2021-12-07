import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import "./navbar.css";

const Navigation = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = authService.getCurrentUser();
    setUser(currUser);
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.reload(false);
  };

  const evaluationIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-pencil-fill"
      viewBox="0 0 16 16"
    >
      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
    </svg>
  );

  const homeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-house-fill"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
      />
      <path
        fill-rule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
      />
    </svg>
  );

  const pageIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-file-earmark-text-fill"
      viewBox="0 0 16 16"
    >
      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
    </svg>
  );

  const groupIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-people-fill"
      viewBox="0 0 16 16"
    >
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path
        fill-rule="evenodd"
        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
      />
      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    </svg>
  );

  const appIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-app"
      viewBox="0 0 16 16"
    >
      <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z" />
    </svg>
  );

  const mathIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-infinity"
      viewBox="0 0 16 16"
    >
      <path d="M5.68 5.792 7.345 7.75 5.681 9.708a2.75 2.75 0 1 1 0-3.916ZM8 6.978 6.416 5.113l-.014-.015a3.75 3.75 0 1 0 0 5.304l.014-.015L8 8.522l1.584 1.865.014.015a3.75 3.75 0 1 0 0-5.304l-.014.015L8 6.978Zm.656.772 1.663-1.958a2.75 2.75 0 1 1 0 3.916L8.656 7.75Z" />
    </svg>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" id="nav">
      <div className="container">
        <span className="navbar-brand" style={{ cursor: "default" }}>
          {" "}
          <i className="bi bi-circle-square"></i> ALGEBREB{" "}
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {user ? (
            <ul className="navbar-nav me-auto">
              <li className="nav-item mx-lg-1">
                <Link to={"/"} className="nav-link">
                  {homeIcon} Inicio
                </Link>
              </li>
              <li className="nav-item mx-lg-2">
                <Link to={"/sheets"} className="nav-link">
                  {pageIcon} Hojas
                </Link>
              </li>
              {user.roles && user.roles.includes("profesor") && (
                <>
                  <li className="nav-item mx-lg-2">
                    <Link to={"/groups"} className="nav-link">
                      {groupIcon} Grupos
                    </Link>
                  </li>
                  <li className="nav-item mx-lg-2">
                    <Link to={"/evaluations"} className="nav-link">
                      {evaluationIcon} Evaluaciones
                    </Link>
                  </li>
                </>
              )}
              {user.roles && user.roles.includes("alumno") && (
                <>
                  <li className="nav-item mx-lg-2">
                    <Link to={"/student_groups"} className="nav-link">
                      {groupIcon} Grupos
                    </Link>
                  </li>
                  <li className="nav-item mx-lg-2">
                    <Link to={"/student_evaluations"} className="nav-link">
                      {evaluationIcon} Evaluaciones
                    </Link>
                  </li>
                </>
              )}
            </ul>
          ) : (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="/#home">
                  {homeIcon} Inicio
                </a>
              </li>
              <li>
                <a className="nav-link mx-lg-2" href="/#app">
                  {appIcon} Aplicación
                </a>
              </li>
              <li>
                <a className="nav-link mx-lg-2" href="/#topics">
                  {mathIcon} Álgebra
                </a>
              </li>
              <li>
                <a className="nav-link mx-lg-2" href="/#team">
                  {groupIcon} Nuestro equipo
                </a>
              </li>
            </ul>
          )}

          {user ? (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/profile"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i> {user.username}
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-dark dm-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link m-1" id="btn-signup" to="/signup">
                  {" "}
                  <i className="bi bi-box-arrow-left"></i> Registrarse{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link m-1" id="btn-signin" to="/signin">
                  {" "}
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión{" "}
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
