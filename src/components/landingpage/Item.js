const Item = (props) => {
  return (
    <div id={props.id} className="row featurette">
      <div className={props.className}>
        <h2 className="display-5 pb-4">{props.title}</h2>
        <p className="lead">{props.text}</p>
      </div>

      <div className="col-md-5 order-md-1 my-auto">
        <div className="thumbnail">
          <img className="img-fluid mx-auto img" src={props.src} alt="img-src" />
          <small>{props.label}</small>
        </div>
      </div>
    </div>
  )
}

export default Item
