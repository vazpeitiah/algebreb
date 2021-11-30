import {useEffect, useState} from 'react'
import { Link, useParams, useHistory} from "react-router-dom"
import helpers from '../../lib/helpers'
import examsService from '../../services/exams.service'

const Evaluations = () => {
  const { examId } = useParams()
  const [data, setData] = useState(null)
  const [exams, setExams] = useState([])

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

  return (
    <div className="container mt-4 p-4">
      <h2>Información de {data && data.sheet.description}</h2>
        <p><b>Grupo:</b> {data && data.group.name}</p>        
        <p><b>Fecha inicio:</b> {data && helpers.formatDate(data.startDate)}</p>
        <p><b>Fecha inicio:</b> {data && helpers.formatDate(data.endDate)}</p>
        <p><b>Estado:</b> {data && helpers.getStateExam(data.startDate, data.endDate)}</p>
      <h4>Tabla de evaluaciones</h4>
      <div className="table-responsive">
      <table className="table">
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
                  Revisión
                </Link>
              </td>
              <td>
                <button className="btn btn-primary">
                  Enviar retroalimentación
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Evaluations
