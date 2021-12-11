import { useState, useEffect } from 'react'
import examsService from '../../services/exams.service'
import { Link } from 'react-router-dom'
import UpdateExam from './UpdateExam'
import helpers from '../../lib/helpers'
import svgIcon from '../../lib/svgIcons'

const EvaluationsTeacher = ({user}) => {
  const [evaluations, setEvaluations] = useState([])
  const [exam, setExam] = useState(null)

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

  const updateExam = async (examId, params) => {
    const res = await examsService.updateExam(examId, params)
    if(res && res.success) {
      setEvaluations([res.exam, ...evaluations.filter(evaluation => evaluation._id !== res.exam._id)])
    } else {
      window.alert("Error: " + res.message)
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
            <th>Grupo</th>
            <th>Nombre</th>
            <th>Fecha Inicio</th>
            <th>Duración</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((ev, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{ev.group.name}</td>
            <td>{ev.sheet.description}</td>
            <td>{helpers.formatDate(ev.startDate)}</td>
            <td>{helpers.getDurationHRS(ev.startDate, ev.endDate)}</td>
            <td>{helpers.getStateExam(ev.startDate, ev.endDate)}</td>
            <td>{ev.type}</td>
            <td>
              <Link to={`/evaluations/admin/${ev._id}`} className="btn btn-secondary">
                {svgIcon.manage}
                Administrar
              </Link>
            </td>
            <td>
              <button className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#update-exam"
                onClick={() => setExam(ev)}>
                {svgIcon.edit}
                Editar
              </button>
            </td>
            <td>
              <button className="btn btn-danger"
                onClick={() => deleteEvaluation(ev._id)}>
                  {svgIcon.delete}
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
      <UpdateExam exam={exam} updateExam={updateExam}/>
    </div>
  )
}

export default EvaluationsTeacher
