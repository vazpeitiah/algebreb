import { useState } from 'react'
import SigninForm from './SigninForm'
import authService from '../../services/auth.service'
import { Link } from 'react-router-dom'

const Signin = (props) => {
  const [message, setMessage] = useState('')

  const handleLogin = async (user) => {
    const res = await authService.signin(user)
    if (res.success) {
      props.history.push("/")
      window.location.reload()
    } else {
      setMessage(res.message)
    }
  }

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      {message &&
        (<div className="alert alert-danger alert-dismissible" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
        </div>)
      }
      <SigninForm onLogin={handleLogin} />
      <Link to='/signup'>Registrarse</Link>
      {/* <Link className="m-3" to='/resetpwd'>Recuperar contraseña</Link> */}
    </div>
  )
}

export default Signin