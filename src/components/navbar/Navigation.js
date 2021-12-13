import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import svgIcon from "../../lib/svgIcons";
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

  const toggleClass = id => {
    const ulsElement = ['home', 'sheets', 'groups', 'evaluations', 'help']

    ulsElement.forEach((ulId) => {
      const ulEl = document.getElementById(ulId)
      
      if(!!ulEl)
        ulEl.className = "nav-item mx-lg-2"
    })
    
    const ulElement = document.getElementById(id);

    if(!!ulElement){
      if (ulElement.className === "nav-item mx-lg-2") 
        ulElement.className = "nav-item-active mx-lg-2";
      else 
        ulElement.className = "nav-item mx-lg-2"
    }
  }

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
              <li id="home" className="nav-item mx-lg-2" onClick={() => toggleClass("home")}>
                <Link to={"/"} className="nav-link">
                  {svgIcon.home} Inicio
                </Link>
              </li>
              <li id="sheets" className="nav-item mx-lg-2" onClick={() => toggleClass("sheets")}>
                <Link to={"/sheets"} className="nav-link">
                  {svgIcon.page} Hojas
                </Link>
              </li>
              {user.roles && user.roles.includes("profesor") && (
                <>
                  <li id="groups" className="nav-item mx-lg-2" onClick={() => toggleClass("groups")}>
                    <Link to={"/groups"} className="nav-link">
                      {svgIcon.group} Grupos
                    </Link>
                  </li>
                  <li id="evaluations" className="nav-item mx-lg-2" onClick={() => toggleClass("evaluations")}>
                    <Link to={"/evaluations"} className="nav-link">
                      {svgIcon.evaluation} Evaluaciones
                    </Link>
                  </li>
                </>
              )}
              {user.roles && user.roles.includes("alumno") && (
                <>
                  <li id="groups" className="nav-item mx-lg-2" onClick={() => toggleClass("groups")}>
                    <Link to={"/student_groups"} className="nav-link">
                      {svgIcon.group} Grupos
                    </Link>
                  </li>
                  <li id="evaluations" className="nav-item mx-lg-2" onClick={() => toggleClass("evaluations")}>
                    <Link to={"/student_evaluations"} className="nav-link">
                      {svgIcon.evaluation} Evaluaciones
                    </Link>
                  </li>
                </>
              )}
              <li id="help" className="nav-item mx-lg-2" onClick={() => toggleClass("help")}>
                <Link to={"/help"} className="nav-link mx-lg-2">
                  {svgIcon.help} Ayuda
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link mx-lg-2" href="/#home">
                  {svgIcon.home} Inicio
                </a>
              </li>
              <li>
                <a className="nav-link mx-lg-2" href="/#app">
                  {svgIcon.app} Aplicación
                </a>
              </li>
              <li>
                <a className="nav-link mx-lg-2" href="/#topics">
                  {svgIcon.math} Álgebra
                </a>
              </li>
              <li>
                <a className="nav-link mx-lg-2" href="/#team">
                  {svgIcon.group} Nuestro equipo
                </a>
              </li>
              <li>
                <Link to={"/help"} className="nav-link mx-lg-2">
                  {svgIcon.help} Ayuda
                </Link>
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
