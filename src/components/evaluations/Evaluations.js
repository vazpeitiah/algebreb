import {useEffect, useState} from 'react'
import { Link, useParams, useHistory} from "react-router-dom"
import helpers from '../../lib/helpers'
import svgIcon from '../../lib/svgIcons'
import examsService from '../../services/exams.service'
import SendFeedback from './SendFeedback'

const Evaluations = () => {
  const { examId } = useParams()
  let history = useHistory()
  const [data, setData] = useState(null)
  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)

  useEffect(() => {
    const getExamData = async () => {
      const res = await examsService.getExamData(examId)
      if(res && res.success) {
        setData(res.exam)
      }else {
        window.alert("Error " + res.message)
      }
    }

    const getExams = async () => {
      const res = await examsService.getExamsTeacher(examId)
      if(res && res.success) {
        setExams(res.exams)
      }else {
        window.alert("Error " + res.message)
      }
    }

    getExamData()
    getExams()
  }, [examId])

  const sendFeed = async (examId, params) => {
    const res = await examsService.updateExamApply(examId, params)
    if(res && res.success) {
      setExams([...exams.filter(exam => exam._id !== examId), res.exam])
    } else {
      window.alert(res.message)
    }
  }

  return (
    <div className="container mt-4 p-4">
      <div className="d-flex justify-content-between pb-lg-4">
        <h2>Información de {data && data.sheet.description}</h2>
        <button className="btn btn-secondary" onClick={() => history.goBack()}>
          {svgIcon.back}
          Regresar
        </button>
      </div>
      <div className="table-responsive">
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>Grupo:</th>
            <th>Fecha inicio:</th>
            <th>Fecha fin:</th>
            <th>Estado:</th>
            {data && data.different === false && (<th></th>)}
          </tr>
        </thead>
        <tbody>
          {data && (
          <tr>
            <td>{data.group.name}</td>
            <td>{helpers.formatDate(data.startDate)}</td>
            <td>{helpers.formatDate(data.endDate)}</td>
            <td>{helpers.getStateExam(data.startDate, data.endDate)}</td>
            {data.different === false && (
              <td>
                <Link className="btn btn-danger" to={`/sheet/${data && data.sheet._id}`}>
                  {svgIcon.edit}
                  Editar hoja
                </Link>
              </td>
            )}
          </tr>
          )}
        </tbody>
      </table>
      </div>
      <h4>Tabla de evaluaciones</h4>
      <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Alumno</th>
            <th>Calificación</th>
            <th>Estado</th>
            <th></th>
            <th></th>
            {data && data.different === true && (<th></th>)}
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{exam.student.name}</td>
              <td>{exam.grade}/10</td>
              <td>
                {!exam.isActive 
                  ? (<span>Entregado</span>) 
                  : (<span>Sin entregar</span>)}
              </td>
              <td>
                <Link className="btn btn-primary" to={`/review/${exam._id}`}>
                  {svgIcon.watch}
                  Revisión
                </Link>
              </td>
              <td>
                <button className="btn btn-success"
                  data-bs-toggle="modal" 
                  data-bs-target="#send_feedback"
                  onClick={() => setSelectedExam(exam)}>
                  {svgIcon.message}
                  Enviar retroalimentación
                </button>
              </td>
              {data && data.different === true && (
                <td>
                <Link className="btn btn-danger" to={`/sheet/${exam.sheet}`}>
                  {svgIcon.edit}
                  Editar hoja
                </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <SendFeedback exam={selectedExam} sendFeed={sendFeed} />
    </div>
  )
}

export default Evaluations
