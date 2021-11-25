import { useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import examsService from '../../services/exams.service'

/* react-katex */
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const ApplyEvaluation = () => {
  const { examId } = useParams()
  const [data, setData] = useState(null)
  const labels = ['a', 'b', 'c', 'd']

  useEffect(() => {
    const getExam = async () => {
      const response = await examsService.getExam(examId)
      if(response && response.success) {
        setData(response.exam)
      }
    }
    getExam()

  }, [examId])

  const submitAnswers = async (e) => {
    e.preventDefault()
    const confirm = window.confirm('¿Estás seguro que quieres terminar la prueba?')
    if(confirm) {
      for (const [name,value] of data) {
        console.log(name,value)
      }
    }
  }

  return (
    <div className="container-fluid p-4">
      <form onSubmit={submitAnswers}>
      <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Grupo</th>
            <th>Timpo restante</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {data && (
          <tr>
            <td>{data.exam.sheet.description}</td>
            <td>{data.exam.group.name}</td>
            <td>{(new Date(data.exam.endDate).getTime() - new Date().getTime()) / (60*60*1000) + ' hrs'}</td>
            <td>
              <button className="btn btn-success form-control" type="submit">
                Enviar respuestas
              </button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
      {data && data.exam.sheet.exercises.map((exercise, index) => (
        <div key={index} className="row">
          <h5>Parte {index+1}: {exercise.instrucciones}</h5>
          {exercise.exercisesArr.map((ex, idx) => (
            <div key={idx} className="form-group col-md-3">
              {ex.enunciado && 
                (<span><b>{idx + 1})</b> <InlineMath math={ex.enunciado} /></span>) 
              }

              { ex.respuestas && ex.respuestas.map(
                  (respuesta, idx2) => (
                    <div className="form-check" style={{color: "#393E46"}} key={idx2}>
                      <input className="form-check-input" type="radio" name={`response_${index}_${idx}`} id={`response_${index}_${idx}`} />
                      <label className="form-check-label" for="flexRadioDefault1">
                        {labels[idx2]}) <InlineMath math={respuesta} />
                      </label>
                    </div>
                  ))
              }
            </div>
          ))}
        </div>
      ))}
      </form>
    </div>
  )
}

export default ApplyEvaluation
