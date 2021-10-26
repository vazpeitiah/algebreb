import { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth.service';

const Navigation = () => {
  const [user, setUser] = useState(authService.getCurrentUser())

  const logout = () => {
    authService.logout()
    setUser(undefined)
    window.location.reload(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to='/'> ALGEBREB </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {user ? (
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to='/'> Inicio </Link>
              </li>
            )}

          </ul>

          {user ? (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/profile" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.username}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/signup'> Registrarse </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/signin'> Iniciar Sesión </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation