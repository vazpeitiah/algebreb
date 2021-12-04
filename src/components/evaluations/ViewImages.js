import React from 'react'

const ViewImages = ({images}) => {
  return (
    <div className="modal fade" id="view_images" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Procedimientos del alumno:</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {images.length !== 0 ? (
            <div id="carousel_img" className="carousel slide border rounded" data-bs-ride="false">
              <div className="carousel-indicators">
                {images.map( (image, index) => (
                  <button type="button" 
                    data-bs-target="#carousel_img" 
                    data-bs-slide-to={index}
                    className={`${index === 0 ? ' active' : ''}`}
                    aria-current="true" 
                    aria-label={`Slide ${index}`}></button>
                ))}
              </div>
              <div className="carousel-inner">
                {images.map( (image, index) => (
                  <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={index}>
                    <img src={image} className="d-block w-100 h-100" alt={`${index+1}`} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carousel_img" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carousel_img" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (<p className="text-danger">El alumno no subio ninguna imagen de sus procedimientos</p>)}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ViewImages
