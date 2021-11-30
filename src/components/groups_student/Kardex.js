import {useState, useEffect} from 'react'
import examsService from '../../services/exams.service'

const Kardex = ({student, group}) => {

  const [evaluations, setEvaluations] = useState([])
  const [grade, setGrade] = useState(0)

  useEffect(() => {
    const getExams = async () => {
      const response = await examsService.getKardex(student.id, group._id)
      if(response && response.success) {
        setEvaluations(response.exams)
        
        let final = 0
        response.exams.forEach(evaluation => final += evaluation.grade)
        final = (final / response.exams.length)

        setGrade(final.toFixed(1))

      } else {
        window.alert(response.message)
      }
    }
    getExams()
  }, [student, group._id])
  

  return (
    <div className="modal fade" id="kardex-student" aria-hidden="true">
      <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Kardex del grupo {group && group.name}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Calificacion</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{evaluation.exam.sheet.description}</td>
                <td>{new Date(evaluation.exam.startDate).toLocaleDateString()}</td>
                <td>{evaluation.grade + '/10'}</td>
                <td>
                  {evaluation.isActive 
                    ? (<span className="text-danger">Sin resolver <i className="bi bi-x-circle"></i></span>) 
                    : (<span className="text-success">Resuelto <i className="bi bi-check-circle"></i></span>)
                  }
                </td>
              </tr>))}
            </tbody>
            {evaluations.length === 0 && (
                <caption>No se han encontrado evaluaciones</caption>
            )}
          </table>
          <p><b>Calificación final: </b>{grade}/10</p>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Kardex
