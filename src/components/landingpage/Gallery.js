import Teacher from '../../assets/img/math.jpeg'
import Studying from '../../assets/img/studying.jpeg'
import School from '../../assets/img/school.jpeg'

const Gallery = () => {
  return (
    <div id="for" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#for" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#for" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#for" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item">
          <img alt="school" className="featurette-image img-fluid mx-auto img" src={School} />
          <div className="container">
            <div className="carousel-caption">
              <h1>Nivel medio superior</h1>
            </div>
          </div>
        </div>

        <div className="carousel-item active">
          <img alt="study" className="featurette-image img-fluid mx-auto img" src={Studying} />
          <div className="container rounded">
            <div className="carousel-caption carousel-label rounded">
              <h1>Alumnos.</h1>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <img alt="teacher" className="featurette-image img-fluid mx-auto img" src={Teacher} />
          <div className="container">
            <div className="carousel-caption">
              <h1>Profesores.</h1>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#for" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden ">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#for" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Gallery;