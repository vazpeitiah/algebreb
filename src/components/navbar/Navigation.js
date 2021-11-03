import { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../../services/auth.service';
import './navbar.css'

const Navigation = () => {
  const [user, setUser] = useState(authService.getCurrentUser())

  const logout = () => {
    authService.logout()
    setUser(undefined)
    window.location.reload(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" id="nav">
      <div className="container">
        <span className="navbar-brand" style={{cursor: 'default'}}> <i className="bi bi-circle-square"></i>  ALGEBREB </span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">

          {user ? (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link"> Dashboard </Link>
              </li>
              <li className="nav-item">
                <Link to={"/sheets"} className="nav-link"> Hojas </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/'> Inicio </Link>
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