import { useState, useEffect } from 'react'
import DatePicker , { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import groupsService from '../../services/groups.service';
import svgIcon from '../../lib/svgIcons';
registerLocale('es', es)

const ApplyExam = ({user, applyExam}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000)) // 1 dia despues
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [different, setDifferent] = useState(true)
  
  useEffect(() => {
    const getGroups = async () => {
      const res = await groupsService.getGroupsByTeacher(user.id)
      if(res && res.success) {
        setGroups(res.groups)
        if(res.groups.length > 0) {
          setSelectedGroup(res.groups[0]._id)
        }
      }
    }
    getGroups()
  }, [user.id])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(groups && groups.length > 0) {
      const params = {
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(), 
        group: selectedGroup,
        different
      }
      applyExam(params)
    } else {
      window.alert('Necesitas crear un grupo primero')
    }
  }

  return (
    <div className='card border-info my-3'>
      <form onSubmit={handleSubmit}>
        <div className='card-header border-info'>
          <h5>Aplicar examen</h5>
        </div>
        <div className='card-body'>
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

          <label htmlFor="">Grupo</label>
          <select className="form-select" 
            required
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}>
            {groups.map((group, index) => (
              <option value={group._id} key={index}>{group.name}</option>
            ))}
            {groups.length === 0 && (<option defaultValue>No tienes grupos todavía</option>)}
          </select>

          <div class="form-check mt-2">
            <input 
              class="form-check-input" 
              type="checkbox" 
              checked={different}
              id="different"
              onChange={() => setDifferent(!different)}
            />
            <label class="form-check-label" for="different">
              Cambiar los ejercicios para cada alumno
            </label>
          </div>

          <button type="submit" className='btn btn-success form-control mt-2'> 
              {svgIcon.start}
            Aplicar 
          </button>
        </div>  
      </form>
    </div>
  )
}

export default ApplyExam
