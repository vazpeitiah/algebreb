import { useEffect, useState} from 'react'
import { useParams, useHistory } from "react-router-dom"
import examsService from '../../services/exams.service'
import ShowSolution from './ShowSolution';

/* react-katex */
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import Feeback from './Feeback';
import ViewImages from './ViewImages';
import svgIcon from '../../lib/svgIcons';


const ExamReview = () => {
  const { examId } = useParams()
  const [data, setData] = useState(null)
  const labels = ['a', 'b', 'c', 'd']
  const [answers, setAnswers] = useState([])
  const [exercise, setExercise] = useState(null)
  const [feed, setFeed] = useState('')

  let history = useHistory()

  useEffect(() => {
    const getExam = async () => {
      const response = await examsService.getExam(examId)
      if(response && response.success) {
        setData(response.exam)
        setAnswers(response.exam.answers)
      } else {
        window.alert(response.message)
        history.goBack()
      }
    }
    getExam()

  }, [examId, history])

  const getAnswer = (list, exercise) => {
    let str = ''
    answers.forEach((answer) => {
      if(parseInt(answer.list) === list && parseInt(answer.exercise) === exercise) {
        str = answer.value
      }
    })
    return str
  }

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between">
        <h2>Revisión de: {data && data.sheet.description}</h2>
        <button className="btn btn-secondary" onClick={() => history.goBack()}>
          {svgIcon.back}
          Regresar
        </button>
      </div>
      <hr/>
      <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre de la hoja</th>
            <th>Grupo</th>
            <th>Calificación</th>
            <th>Estado</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {data && (
          <tr>
            <td>{data.sheet.description}</td>
            <td>{data.exam.group.name}</td>
            <td>{`${data.grade}/10`}</td>
            <td>
              {data.isActive 
                ? (<span className="text-danger">Sin resolver <i className="bi bi-x-circle"></i></span>) 
                : (<span className="text-success">Resuelto <i className="bi bi-check-circle"></i></span>)
              }
            </td>
            <td>
              <button className="btn btn-success"
                data-bs-toggle="modal" 
                data-bs-target="#feedback"
                onClick={() => setFeed(data.feedback)}>
                  {svgIcon.message}
                Ver retroalimentación
              </button>
            </td>
            <td>
              <button className="btn btn-primary"
                data-bs-toggle="modal" 
                data-bs-target="#view_images"
                onClick={() => setFeed(data.feedback)}>
                {svgIcon.image}
                Ver procedimientos
              </button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
      {data && data.sheet.exercises.map((exercise, index) => (
        <div key={index}>
          <h5>Parte {index+1}: {exercise.instrucciones}</h5>
          {exercise.exercisesArr.map((ex, idx) => (
            <div key={idx} className={`card m-2 pt-2 ${ex.solucion === getAnswer(index, idx) ? 'border-success' : 'border-danger'}`}>
              {ex.enunciado && 
                (<div className="card-header d-flex justify-content-between">
                  <h6 className="pt-2"><b>{idx + 1})</b> <InlineMath math={ex.enunciado} /></h6>
                  {ex.solucion === getAnswer(index, idx) 
                    ? (<span className="text-success">Correcto <i className="bi bi-check-square-fill"></i></span>)
                    : (<span className="text-danger">Incorrecto <i className="bi bi-x-square-fill"></i></span>)
                  }
                </div>) 
              }
              <div className="card-body">
              { ex.respuestas && ex.respuestas.map(
                  (respuesta, idx2) => (
                    <div className="form-check" style={{color: "#393E46"}} key={idx2}>
                      <input className="form-check-input" 
                        type="radio" 
                        name={`answer${index}_${idx}`} 
                        id={`answer${index}_${idx}`}
                        checked={respuesta === getAnswer(index, idx)}
                        required
                        readOnly />
                      <label className="form-check-label" htmlFor={`response_${index}_${idx}`}>
                        {labels[idx2]}) <InlineMath math={respuesta} /> 
                        {ex.solucion === respuesta && (<span>(Respuesta correcta<i className="bi bi-check-all"></i>)</span>)}
                      </label>
                    </div>
                  ))
              }
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-end">
                <button className="btn btn-info" 
                  data-bs-toggle="collapse" 
                  data-bs-target={`#solution${index}${idx}`}
                  onClick={() => setExercise(ex)}>
                  {svgIcon.watch}
                  Ver solucion
                </button>
              </div>
              <ShowSolution exercise={ex} id={index +""+ idx} />
            </div>
          ))}
        </div>
      ))}
      <ViewImages images={data ? data.images : []}/>
      <Feeback feed={feed}/>
    </div>
  )
}

export default ExamReview
