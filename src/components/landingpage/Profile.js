const Profile = (props) => {
  const url = "https://avatars.githubusercontent.com/u/" + props.src 
  const profile_url = "https://github.com/" + props.url
  return (
    <div className="col-lg-4">
      <a href={profile_url} target="_blank" rel="noreferrer">
        <img
          className="bd-placeholder-img rounded"
          width="140"
          height="140"
          src={url}
          alt="name-user"
        />
      </a>
      <h3 className="pt-4">{props.name}</h3>
    </div>
  );
};

export default Profile;
