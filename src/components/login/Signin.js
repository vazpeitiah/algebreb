import { useState } from 'react'
import SigninForm from './SigninForm'
import authService from '../../services/auth.service'
import { Link } from 'react-router-dom'
import './login.css'

const Signin = (props) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (user) => {
    setIsLoading(true)
    const res = await authService.signin(user)
    if (res.success) {
      props.history.push("/")
      window.location.reload()
    } else {
      setMessage(res.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="d-flex align-items-center fill container col-lg-4 my-auto animate__animated animate__fadeInUp">
      <div className="card col align-self-center">
        <div className="card-header text-center bg-algebreb py-3">
          <div className="algebreb-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00ADB5" className="bi bi-circle-square" viewBox="0 0 16 16">
              <path d="M0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6z" />
              <path d="M12.93 5h1.57a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1.57a6.953 6.953 0 0 1-1-.22v1.79A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 4h-1.79c.097.324.17.658.22 1z" />
            </svg>
            <span className="ps-2 h3">ALGEBREB</span>
          </div>
        </div>

        <legend className="ps-3 py-3 text-center h1">Iniciar Sesión</legend>

        <div className="card-body">
          {message &&
            (<div className="alert alert-danger alert-dismissible" role="alert">
              <i className="bi bi-x-octagon-fill"></i> {message}
              <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
            </div>)
          }
          <SigninForm onLogin={handleLogin} isLoading={isLoading} />
          <Link className="link-algebreb" to="/signup">¿Aún no tienes una cuenta?</Link>
          {/* <Link className="m-3" to='/resetpwd'>Recuperar contraseña</Link> */}
        </div>
      </div>
    </div>

  )
}

export default Signin