const Profile = (props) => {
  return (
    <div className="col-lg-4">
      <img
        className="bd-placeholder-img rounded-circle"
        width="140"
        height="140"
        src={props.src}
        alt="name-user"
      />
      <h3 className="pt-4">{props.name}</h3>
    </div>
  )
}

export default Profile
