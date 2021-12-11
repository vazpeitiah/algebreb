import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import examsService from '../../services/exams.service'
import helpers from '../../lib/helpers'
import svgIcon from '../../lib/svgIcons'

const EvaluationsStudent = ({user}) => {
  const [exams, setExams] = useState([])

  useEffect(() => {
    const getExams = async () => {
      const res = await examsService.getExamsStudent(user.id)
      if(res && res.success) {
        setExams(res.exams)
      } else {
        window.alert(res.message)
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
          {exams.map((exam, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{exam.examData.sheet.description}</td>
            <td>{exam.examData.group.name}</td>
            <td>{helpers.formatDate(exam.examData.startDate)}</td>
            <td>{helpers.getDurationHRS(exam.examData.startDate, exam.examData.endDate)}</td>
            <td>{exam.grade + '/10'}</td>
            <td>
              {helpers.getStateExam(exam.examData.startDate, exam.examData.endDate)}
            </td>
            <td>
              { new Date() >= new Date(exam.examData.startDate) && new Date() < new Date(exam.examData.endDate)
                ? (exam.isActive ? ( // Si se puede hacer el examen
                    <Link className="btn btn-success" to={`/exam/${exam._id}`}>
                      {svgIcon.start}
                      Iniciar
                    </Link>
                  ) : (  // El alumno ya envio sus respuestas
                    <Link className="btn btn-primary" to={`/review/${exam._id}`}>
                      {svgIcon.watch}
                      Revisión
                    </Link>
                  ) 
                ) : ( new Date() >= new Date(exam.examData.endDate) ? (  // No hizo el examen o aún no inicia
                    <Link className="btn btn-primary" to={`/review/${exam._id}`}>
                      {svgIcon.watch}
                      Revisión
                    </Link>
                  ) : (  // El alumno ya envio sus respuestas
                    <Link className="btn btn-secondary disabled" to={`/exam/${exam._id}`}>
                      {svgIcon.start}
                      Iniciar
                    </Link>
                  ) 
                )
              } 
            </td>
          </tr>))}
        </tbody>
        {exams.length === 0 && (
            <caption>No se han encontrado evaluaciones</caption>
        )}
      </table>
      </div>
    </div>
  )
}

export default EvaluationsStudent
