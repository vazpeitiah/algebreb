import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import examsService from '../../services/exams.service'

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
            <td>{new Date(evaluation.exam.startDate).toLocaleString()}</td>
            <td>{evaluation.duration}</td>
            <td>{evaluation.grade + '/10'}</td>
            <td>
              {evaluation.isActive 
                ? (<span className="text-danger">Sin resolver <i className="bi bi-x-circle"></i></span>) 
                : (<span className="text-success">Resuelto <i className="bi bi-check-circle"></i></span>)
              }
            </td>
            <td>
              { new Date() >= new Date(evaluation.exam.startDate) && new Date() < new Date(evaluation.exam.endDate)
                ? (evaluation.isActive ? ( // Si se puede hacer el examen
                    <Link className="btn btn-success" to={`/exam/${evaluation._id}`}>
                      Iniciar
                    </Link>
                  ) : (  // El alumno ya envio sus respuestas
                    <Link className="btn btn-primary" to={`/review/${evaluation._id}`}>
                      Revisión
                    </Link>
                  ) 
                ) : ( new Date() >= new Date(evaluation.exam.endDate) ? (  // No hizo el examen o aún no inicia
                    <Link className="btn btn-primary" to={`/review/${evaluation._id}`}>
                      Revisión
                    </Link>
                  ) : (  // El alumno ya envio sus respuestas
                    <Link className="btn btn-secondary disabled" to={`/exam/${evaluation._id}`}>
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
