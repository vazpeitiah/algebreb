import { useState, useEffect } from 'react'
import examsService from '../../services/exams.service'
import { Link } from 'react-router-dom'


const EvaluationsTeacher = ({user}) => {
  const [evaluations, setEvaluations] = useState([])
  //const [groups, setGroups] = useState([])

  useEffect(() => {
    const getExams = async () => {
      const exams = await examsService.getExams(user.id)
      setEvaluations(exams)
    }
    getExams()
  }, [user.id])

  const deleteEvaluation = async (examId) => {
    const conf = window.confirm('¿Realmente deseas eliminar la evaluación?')
    if(conf) {
      const response = await examsService.deleteExam(examId)
      if(response && response.success) {
        setEvaluations(evaluations.filter(eva => eva._id !== response.exam._id))
      } else {
        window.alert('Error: '+ response.message)
      }
    }
  
  }

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((ev, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{ev.sheet.description}</td>
            <td>{ev.group.name}</td>
            <td>{new Date(ev.startDate).toLocaleString()}</td>
            <td>{(new Date(ev.endDate).getTime() - new Date(ev.startDate).getTime()) / (1000*60*60) + ' hrs'}</td>
            <td>
              <Link to={`/sheet/${ev.sheet._id}`} className="btn btn-primary">
                Editar
              </Link>
            </td>
            <td>
              <button className="btn btn-danger"
                onClick={() => deleteEvaluation(ev._id)}>
                  Eliminar
              </button>
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

export default EvaluationsTeacher
