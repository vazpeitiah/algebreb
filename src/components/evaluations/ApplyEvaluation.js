import { useEffect, useState} from 'react'
import { useParams, useHistory } from "react-router-dom"
import examsService from '../../services/exams.service'

/* react-katex */
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import UploadFile from './UploadFile';
import Timer from './Timer';

const ApplyEvaluation = () => {
  const { examId } = useParams()
  const [data, setData] = useState(null)
  const labels = ['a', 'b', 'c', 'd']
  const [answers, setAnswers] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  let history = useHistory()
  useEffect(() => {
    const getExam = async () => {
      const response = await examsService.getExam(examId)
      if(response && response.success) {
        setData(response.exam)
      } else {
        window.alert(response.message)
        history.goBack()
      }
    }
    getExam()

  }, [examId, history])

  const submitAnswers = async (e) => {
    e.preventDefault()
    const confirm = window.confirm('¿Estás seguro que quieres terminar la prueba?')
    if(confirm) {
      const answersArr = Object.values(answers)
      let count = 0

      answersArr.forEach((answer) => {
        const list = answer.list
        const ex = answer.exercise
        const corretAnswer = data.exam.sheet.exercises[list].exercisesArr[ex].solucion
        
        if(answer.value === corretAnswer){
          count ++
        }
      })

      const grade = count * 10 / answersArr.length

      const params = {
        exam: data.exam._id,
        student: data.student,
        grade: grade.toFixed(2),
        answers: answersArr,
        isActive: false,
        feedback: 'Saved answers.'
      }

      const response = await examsService.submitExam(data._id, params)
      
      if(response && response.success) {
        window.alert('Se han guardado las respuestas')
        history.goBack()
      }else {
        window.alert('Error: '+ response.message)
      }

    }
  }

  const changeAnswers = (e) => {
    const inputName = e.target.name 
    const newValue = e.target.value

    const list = inputName.split('r')[1].split('_')[0]
    const exercise = inputName.split('r')[1].split('_')[1]

    setAnswers({...answers, [inputName]: {value: newValue, list, exercise}})
  }

  const uploadImages = async (images) => {
    setIsLoading(true)
    const response = await examsService.uploadImages(data._id, images)
    if(response && response.success) {
      setData(response.exam)
    } else {
      window.alert(response.message)
      history.goBack()
    }
    setIsLoading(false)
  }

  return (
    <div className="container p-4">
      <form onSubmit={submitAnswers}>
      <div className="d-flex justify-content-between">
        <h3>Evaluación: {data && data.exam.sheet.description}</h3>
        <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>
          Regresar
        </button>
      </div>
      <div className="table-responsive">
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Grupo</th>
            <th>Archivos</th>
            <th>Timpo restante</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {data && (
          <tr>
            <td>{data.exam.sheet.description}</td>
            <td>{data.exam.group.name}</td>
            <td>{data.images.length === 0 ? 'Sin subir' : `${data.images.length}`}</td>
            {/* <td>{helpers.timeLeft(new Date().toISOString(), data.exam.endDate)}</td> */}
            <td><Timer endDate={data.exam.endDate} /></td>
            <td className="text-end">
              <button className="btn btn-primary" 
                type="button"
                data-bs-toggle="modal" 
                data-bs-target="#upload_file">
                Subir archivos
              </button> 
            </td>
            <td className="text-end">
              <button className="btn btn-success" type="submit">
                Enviar respuestas
              </button> 
            </td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
      {data && data.exam.sheet.exercises.map((exercise, index) => (
        <div key={index}>
          <h5>Parte {index+1}: {exercise.instrucciones}</h5>
          {exercise.exercisesArr.map((ex, idx) => (
            <div key={idx} className="card m-2">
              {ex.enunciado && 
                (<h6 className="card-header"><b>{idx + 1})</b> <InlineMath math={ex.enunciado} /></h6>) 
              }
              { ex.respuestas && ex.respuestas.map(
                  (respuesta, idx2) => (
                    <div className="form-check m-2" style={{color: "#393E46"}} key={idx2}>
                      <input className="form-check-input" 
                        type="radio" 
                        name={`answer${index}_${idx}`} 
                        id={`answer${index}_${idx}`}
                        value={respuesta}
                        onClick={changeAnswers}
                        required />
                      <label className="form-check-label" htmlFor={`response_${index}_${idx}`}>
                        {labels[idx2]}) <InlineMath math={respuesta} /> {ex.solucion === respuesta && (<span>X</span>)}
                      </label>
                    </div>
                  ))
              }
            </div>
          ))}
        </div>
      ))}
      </form>
      <UploadFile uploadImages={uploadImages} images={data ? data.images : []} isLoading={isLoading} />
    </div>
  )
}

export default ApplyEvaluation
