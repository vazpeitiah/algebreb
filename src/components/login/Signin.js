import { useState } from 'react'
import SigninForm from './SigninForm'
import authService from '../../services/auth.service'
import { Link } from 'react-router-dom'

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
    <div className="container col-lg-4 col-md-5 col-sm-6">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Iniciar Sesión</h1>
        </div>
        <div className="card-body">
          {message &&
            (<div className="alert alert-danger alert-dismissible" role="alert">
              <i className="bi bi-x-octagon-fill"></i> {message}
              <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
            </div>)
          }
          <SigninForm onLogin={handleLogin} isLoading={isLoading} />
          <Link to="/signup">¿Aún no tienes una cuenta?</Link>
          {/* <Link className="m-3" to='/resetpwd'>Recuperar contraseña</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Signin