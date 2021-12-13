import {useState, useEffect} from 'react'
import examsService from '../../services/exams.service'

const Kardex = ({student, group}) => {

  const [exams, setExams] = useState([])
  const [grade, setGrade] = useState(0)

  useEffect(() => {
    const getExams = async () => {
      const res = await examsService.getKardex(student, group)
      if(res && res.success) {
        setExams(res.exams)
        
        let final = 0
        res.exams.forEach(evaluation => final += evaluation.grade)
        final = (final / res.exams.length)

        setGrade(final.toFixed(1))

      } else {
        window.alert(res.message)
      }
    }
    getExams()
  }, [student, group])
  

  return (
    <div className="modal fade" id="kardex-student" aria-hidden="true">
      <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Kardex del estudiante</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Evaluación</th>
                <th>Fecha</th>
                <th>Calificacion</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exam.examData.sheet.description}</td>
                <td>{new Date(exam.examData.startDate).toLocaleDateString()}</td>
                <td>{exam.grade + '/10'}</td>
                <td>
                  {exam.isActive 
                    ? (<span className="text-danger">Sin resolver <i className="bi bi-x-circle"></i></span>) 
                    : (<span className="text-success">Resuelto <i className="bi bi-check-circle"></i></span>)
                  }
                </td>
              </tr>))}
            </tbody>
            {exams.length === 0 && (
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
