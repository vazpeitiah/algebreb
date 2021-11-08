import { useState } from 'react'
import SignupForm from './SignupForm'
import authService from '../../services/auth.service'
import { Link } from 'react-router-dom'

const Signup = (props) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signup = async (newUser) => {
    setIsLoading(true)
    if (newUser.password === newUser.passwordConfirm) {
      const res = await authService.signup(newUser)
      if (res.success) {
        props.history.push("/")
        window.location.reload()
      } else {
        setMessage(res.message)
      }
    } else {
      setMessage('ERROR: Las contraseñas no coinciden')
    }
    setIsLoading(false )
  }

  return (
    <div className="container col-lg-4 mt-4 p-4">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Registrarse</h1>
        </div>
        <div className="card-body">
          {message &&
            (<div className="alert alert-danger alert-dismissible" role="alert">
              {message}
              <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
            </div>)
          }
          <SignupForm onSignup={signup} isLoading={isLoading}/>
          <Link to='/signin'>¿Ya tienes una cuenta?</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup