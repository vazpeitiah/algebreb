import { useState } from 'react'
import SignupForm from './SignupForm'
import authService from '../../services/auth.service'

const Signup = (props) => {
  const [message, setMessage] = useState('')

  const signup = async (newUser) => {
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
  }

  return (
    <div className="container">
      <h1>Registrarse</h1>
      {message &&
        (<div className="alert alert-danger alert-dismissible" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
        </div>)
      }
      <SignupForm onSignup={signup} />
    </div>
  )
}

export default Signup