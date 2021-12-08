import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import examsService from '../../services/exams.service'
import helpers from '../../lib/helpers'

const EvaluationsStudent = ({user}) => {
  const [evaluations, setEvaluations] = useState([])

  useEffect(() => {
    const getExams = async () => {
      const response = await examsService.getExamsStudent(user.id)
      if(response && response.success) {
        setEvaluations(response.exams)
      } else {
        window.alert(response.message)
      }
    }
    getExams()
  }, [user.id])
  
  const startIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill me-2" viewBox="0 0 16 16">
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
  const reviewIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill me-2" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>

  return (
    <div className="container mt-4 p-4 animate__animated animate__fadeInUp">
      <h2>Tabla de evaluaciones</h2>
      <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Grupo</th>
            <th>Fecha Inicio</th>
            <th>Duración</th>
            <th>Calificacion</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{evaluation.exam.sheet.description}</td>
            <td>{evaluation.exam.group.name}</td>
            <td>{helpers.formatDate(evaluation.exam.startDate)}</td>
            <td>{helpers.getDurationHRS(evaluation.exam.startDate, evaluation.exam.endDate)}</td>
            <td>{evaluation.grade + '/10'}</td>
            <td>
              {helpers.getStateExam(evaluation.exam.startDate, evaluation.exam.endDate)}
            </td>
            <td>
              { new Date() >= new Date(evaluation.exam.startDate) && new Date() < new Date(evaluation.exam.endDate)
                ? (evaluation.isActive ? ( // Si se puede hacer el examen
                    <Link className="btn btn-success" to={`/exam/${evaluation._id}`}>
                      {startIcon}
                      Iniciar
                    </Link>
                  ) : (  // El alumno ya envio sus respuestas
                    <Link className="btn btn-primary" to={`/review/${evaluation._id}`}>
                      {reviewIcon}
                      Revisión
                    </Link>
                  ) 
                ) : ( new Date() >= new Date(evaluation.exam.endDate) ? (  // No hizo el examen o aún no inicia
                    <Link className="btn btn-primary" to={`/review/${evaluation._id}`}>
                      {reviewIcon}
                      Revisión
                    </Link>
                  ) : (  // El alumno ya envio sus respuestas
                    <Link className="btn btn-secondary disabled" to={`/exam/${evaluation._id}`}>
                      {startIcon}
                      Iniciar
                    </Link>
                  ) 
                )
              } 
            </td>
          </tr>))}
        </tbody>
        {evaluations.length === 0 && (
            <caption>No se han encontrado evaluaciones</caption>
        )}
      </table>
      </div>
    </div>
  )
}

export default EvaluationsStudent
