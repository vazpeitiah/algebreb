import { useState, useEffect } from 'react'
import examsService from '../../services/exams.service'
import { Link } from 'react-router-dom'
import UpdateExam from './UpdateExam'
import helpers from '../../lib/helpers'

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
            <td>
              <Link to={`/evaluations/admin/${ev._id}`} className="btn btn-secondary">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  className="bi bi-gear-fill me-2"
                  viewBox="0 0 16 16">
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                </svg>
                Administrar
              </Link>
            </td>
            <td>
              <button className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#update-exam"
                onClick={() => setExam(ev)}>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill me-2"
                  viewBox="0 0 16 16"
                  >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
                Editar
              </button>
            </td>
            <td>
              <button className="btn btn-danger"
                onClick={() => deleteEvaluation(ev._id)}>
                  <svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-trash-fill me-2"
										viewBox="0 0 16 16">
										<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
									</svg>
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
