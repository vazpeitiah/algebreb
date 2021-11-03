import authService from '../../services/auth.service'
import UpdateProfile from './UpdateProfile'

const Profile = ({ user }) => {

  const updateProfile = async (params) => {
    const res = await authService.updateProfile(params)
    if(res && res.success) {
      alert('Perfil actualizado correctamente')
      window.location.reload()
    }else {
      alert(res.message)
    }
  }

  return (
    <div className="container col-lg-4">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Perfil del usuario</h1>
        </div>
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