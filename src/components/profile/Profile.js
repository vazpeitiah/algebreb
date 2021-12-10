import authService from '../../services/auth.service'
import UpdateProfile from './UpdateProfile'
import './profile.css'

const Profile = ({ user }) => {

  const updateProfile = async (params) => {
    const res = await authService.updateProfile(params)
    if (res && res.success) {
      alert('Perfil actualizado correctamente')
      window.location.reload()
    } else {
      alert(res.message)
    }
  }

  return (
    <div className="d-flex align-items-center fill container col-lg-5 my-auto">
      <div className="card col align-self-center">
        <div className="card-header text-center bg-algebreb-dark py-3">
          <div className="algebreb-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00ADB5" className="bi bi-circle-square" viewBox="0 0 16 16">
              <path d="M0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6z" />
              <path d="M12.93 5h1.57a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1.57a6.953 6.953 0 0 1-1-.22v1.79A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 4h-1.79c.097.324.17.658.22 1z" />
            </svg>
            <span className="ps-2 h3">ALGEBREB</span>
          </div>
        </div>

        <legend className="ps-3 py-3 text-center h1">Perfil de usuario</legend>

        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Nombre completo: </th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row">Nombre de usuario: </th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th scope="row">Correo electrónico: </th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Tipo de usuario: </th>
                <td>{user.roles.map((rol, index) => (<p key={index}>{rol}</p>))}</td>
              </tr>
            </tbody>
          </table>

          <UpdateProfile user={user} updateProfile={updateProfile} />

        </div>
      </div>
    </div>
  )
}

export default Profile