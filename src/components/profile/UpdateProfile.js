import { useState } from 'react'

const UpdateProfile = ({ user, updateProfile }) => {
  const [passwd, setPasswd] = useState('')
  const [name, setName] = useState(user.name)
  const [role, setRole] = useState(user.roles[0])
  const [email, setEmail] = useState(user.email)
  const [showPass, setShowPass] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordCofirm] = useState('')

  const openModal = () => {
    setPasswd('')
    setName(user.name)
    setEmail(user.email)
    setRole(user.roles[0])
    setPassword('')
    setPasswordCofirm('')
    setShowPass(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === passwordConfirm) {
      const params = {
        username: user.username,
        passwd,
        name,
        email,
        roles: [role]
      }
      if (password) {
        params.password = password // checar que pex
      }
      updateProfile(params)
    } else {
      alert('Error: Las contraseñas no coiciden')
    }
  }

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" className="btn btn-primary bg-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil-fill me-2"
            viewBox="0 0 16 16"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
          Editar perfil
        </button>
      </div>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar perfil de usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <label className="fw-bold">Contraseña:</label>
                <input type="password"
                  className='form-control'
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  required />
                <label className="pt-5 pb-1" htmlFor="name">Nombre completo</label>
                <input type="text"
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required />
                <label className="pt-3 pb-1" htmlFor="email">Correo electrónico</label>
                <input type="email"
                  className='form-control mb-3'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
                <label className="pt-3 pb-1 form-label" htmlFor="role">Tipo de usuario:</label>
                <select name="role"
                  id="role"
                  className='form-select'
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}>
                  {role === "admin" ?
                    (<option value="admin">Administrador</option>) : (
                      <>
                        <option value="alumno">Alumno</option>
                        <option value="profesor">Profesor</option>
                      </>
                    )}
                </select>
                <label className="pt-3 pb-1">¿Quieres cambiar la contraseña?</label>
                <select className='form-select'
                  value={showPass}
                  onChange={() => setShowPass(!showPass)}>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>

                {showPass && (
                  <>
                    <label className="pt-3 pb-1">Nueva contraseña</label>
                    <input type="password"
                      className='form-control'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                    <label className="pt-3 pb-1">Confirmar nueva contraseña</label>
                    <input type="password"
                      className='form-control'
                      value={passwordConfirm}
                      onChange={(e) => setPasswordCofirm(e.target.value)}
                      required />
                  </>
                )}


              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-x-square-fill me-2" 
                    viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                  </svg>
                  Cancelar 
                </button>
                <button type="submit" className="btn btn-primary bg-btn">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-check-square-fill me-2" 
                    viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                  </svg>
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
