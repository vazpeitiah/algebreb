import {useEffect, useState} from 'react'
import { Link, useParams, useHistory} from "react-router-dom"
import helpers from '../../lib/helpers'
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
      <div className="d-flex justify-content-between">
        <h2>Información de {data && data.sheet.description}</h2>
        <button className="btn btn-secondary" onClick={() => history.goBack()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square-fill me-2" viewBox="0 0 16 16">
            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
          </svg>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && (
          <tr>
            <td>{data.group.name}</td>
            <td>{helpers.formatDate(data.startDate)}</td>
            <td>{helpers.formatDate(data.endDate)}</td>
            <td>{helpers.getStateExam(data.startDate, data.endDate)}</td>
            <td>
            <Link className="btn btn-danger" to={`/sheet/${data && data.sheet._id}`}>
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
              Editar hoja
            </Link>
            </td>
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
            <th>#</th>
            <th>Alumno</th>
            <th>Calificación</th>
            <th>Estado</th>
            <th></th>
            <th></th>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill me-2" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>
                  Revisión
                </Link>
              </td>
              <td>
                <button className="btn btn-success"
                  data-bs-toggle="modal" 
                  data-bs-target="#send_feedback"
                  onClick={() => setSelectedExam(exam)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text-fill me-2" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                  </svg>
                  Enviar retroalimentación
                </button>
              </td>
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
