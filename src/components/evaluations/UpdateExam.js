import {useEffect, useState} from 'react'
import DatePicker , { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import helpers from '../../lib/helpers';
import svgIcon from '../../lib/svgIcons';
registerLocale('es', es)

const UpdateExam = ({exam, updateExam}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000)) // 1 dia despues

  useEffect(() => {
    if(exam) {
      setStartDate(new Date(exam.startDate))
      setEndDate(new Date(exam.endDate))
    }
  }, [exam])

  const handleSubmit = (e) => {
    e.preventDefault()

    const params = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      type: exam.type
    }

    updateExam(exam._id, params)

    setStartDate(new Date())
    setEndDate(new Date(Date.now() + 86400000))
  }

  return (
    <div className="modal fade" id="update-exam" aria-hidden="true">
      <div className="modal-dialog modal-lg">
      <form onSubmit={handleSubmit}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Actualizar información del examen</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <label htmlFor="">Fecha inicio</label>
          <DatePicker className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="dd/MMMM/yyyy hh:mm aa"
            locale="es" 
            required />
          <label htmlFor="">Fecha fin</label>
          <DatePicker className="form-control"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="dd/MMMM/yyyy hh:mm aa"
            locale="es" 
            required />
          <p className="mt-2"><b>Duración: </b>{helpers.getDuration(startDate.toISOString(), endDate.toISOString())}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            {svgIcon.cancel}
            Cerrar
          </button>
          <button type="submit" className='btn btn-primary' data-bs-dismiss="modal">
            {svgIcon.confirm}
            Actualizar
          </button>
        </div>
      </div>
      </form>
      </div>
    </div>
  )
}

export default UpdateExam
