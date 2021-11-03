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
    if(password === passwordConfirm) {
      const params = {
        username: user.username,
        passwd,
        name,
        email,
        roles: [role]
      }
      if(password){
        params.password = password
      }
      updateProfile(params)
    }else {
      alert('Error: Las contraseñas no coiciden')
    }
  }

  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={openModal}>
        Editar perfil
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar perfil de usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="modal-body">
                <label>Contraseña:</label>
                <input type="password"
                  className='form-control'
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  required />
                <label htmlFor="name">Nombre de usuario</label>
                <input type="text"
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required/>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email"
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
                <label htmlFor="role" className="form-label">Tipo de usuario:</label>
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
                <label>¿Quieres cambiar la contraseña?</label>
                <select className='form-select'
                  value={showPass}
                  onChange={() => setShowPass(!showPass)}>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
                
                { showPass && (
                  <>
                    <label>Nueva contraseña</label>
                    <input type="password"
                      className='form-control'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                    <label>Confirmar nueva contraseña</label>
                    <input type="password"
                      className='form-control'
                      value={passwordConfirm}
                      onChange={(e) => setPasswordCofirm(e.target.value)}
                      required />
                  </>
                )}

              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Cancelar </button>
              <button type="submit" className="btn btn-primary"> Actualizar </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
