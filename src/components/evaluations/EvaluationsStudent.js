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
      }
    }
    getExams()
  }, [user.id])

  return (
    <div className="container mt-4 p-4">
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
            <td>{(new Date(evaluation.exam.endDate).getTime() - new Date(evaluation.exam.startDate).getTime()) / (1000*60*60) + ' hrs'}</td>
            <td>
              <Link className="btn btn-success" to={`/exam/${evaluation._id}`} >
                Iniciar
              </Link>
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
