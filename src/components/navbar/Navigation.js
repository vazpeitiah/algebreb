import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../../services/auth.service';
import './navbar.css'

const Navigation = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currUser = authService.getCurrentUser()
    setUser(currUser)
  }, [])

  const logout = () => {
    authService.logout()
    setUser(null)
    window.location.reload(false);
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top" id="nav">
        <div className="container">
          <span className="navbar-brand" style={{ cursor: 'default' }}> <i className="bi bi-circle-square"></i>  ALGEBREB </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">

            {user ? (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/sheets"} className="nav-link">Hojas</Link>
                </li>
                {user.roles && user.roles.includes('profesor') && (
                  <>
                    <li className="nav-item">
                      <Link to={"/groups"} className="nav-link">Grupos</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/evaluations"} className="nav-link">Evaluaciones</Link>
                    </li>
                  </>
                )}
                {user.roles && user.roles.includes('alumno') && (
                  <>
                    <li className="nav-item">
                      <Link to={"/student_groups"} className="nav-link">Grupos</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/student_evaluations"} className="nav-link">Evaluaciones</Link>
                    </li>
                  </>
                )}
              </ul>
            ) : (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href='/#home'>Inicio</a>
                </li>
                <li>
                  <a className="nav-link" href="/#app">Aplicación</a>
                </li>
                <li>
                  <a className="nav-link" href="/#topics">Álgebra</a>
                </li>
                <li>
                  <a className="nav-link" href="/#team">Nuestro equipo</a>
                </li>
              </ul>
            )}

            {user ? (
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="/profile" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle"></i> {user.username}
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                    <li><button className="dropdown-item" onClick={logout}>Cerrar sesión</button></li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link m-1" id="btn-signup" to='/signup'>  <i className="bi bi-box-arrow-left"></i> Registrarse </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link m-1" id="btn-signin" to='/signin'> <i className="bi bi-box-arrow-in-right"></i>   Iniciar Sesión </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
  )
}

export default Navigation