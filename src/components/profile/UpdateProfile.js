import { useState } from 'react'
import svgIcon from '../../lib/svgIcons'

const UpdateProfile = ({ user, updateProfile }) => {
  const [passwd, setPasswd] = useState('')
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [showPass, setShowPass] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordCofirm] = useState('')

  const openModal = () => {
    setPasswd('')
    setName(user.name)
    setEmail(user.email)
    setPassword('')
    setPasswordCofirm('')
    setShowPass(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === passwordConfirm) {
      let params = {
        username: user.username,
        passwd,
        name,
        email
      }
      if (password) {
        params = {...params, password}
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
          {svgIcon.edit}
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
                <div class="alert alert-info" role="alert">
                <i class="bi bi-info-circle-fill"></i> Para actualizar la información de la cuenta, primero debe ingresar su contraseña actual.
                </div>
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
                  {svgIcon.cancel}
                  Cancelar 
                </button>
                <button type="submit" className="btn btn-primary bg-btn">
                  {svgIcon.confirm}
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
