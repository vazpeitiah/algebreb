const Profile = ({ user }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Perfil del usuario</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><b>Username: </b> {user.username} </li>
        <li className="list-group-item"><b>Nombre: </b> {user.name} </li>
        <li className="list-group-item"><b>Tipo de usuario: </b> {user.roles} </li>
      </ul>
    </div>
  )
}

export default Profile