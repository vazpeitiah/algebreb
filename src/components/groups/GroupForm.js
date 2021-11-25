import { useState } from 'react'

const GroupForm = ({ addGroup, updateGroup, group}) => {
  const [name, setName] = useState(group ? group.name : '')
  const [isOpen, setIsOpen] = useState(group ? group.isOpen : false)

  const hanldeSubmit = (e) => {
    e.preventDefault()

    if(group) {
      const params = {
        name, isOpen,
        students: group.students,
        teacher: group.teacher, 
      }
      updateGroup(group._id, params)
    } else {
      const params = {
        name, isOpen
      }

      addGroup(params)
    }

    setName('')
    setIsOpen(false)
    
  }

  return (
    <form onSubmit={hanldeSubmit} className="row align-items-center border rounded p-2">
      <div className="col-auto">
        <label htmlFor="name">Nombre del grupo:</label>
      </div>
      <div className="col">
        <input type="text" 
          className="form-control"
          placeholder="Nombre del grupo"
          value={name} 
          onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="col-auto">
        <label htmlFor="name">¿Está abierto?:</label>
      </div>
      <div className="col-auto">
        <input className="form-check-input" 
          type="checkbox" 
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)} />
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success form-control">{group ? "Actualizar" : "Agregar"}</button>
      </div>

    </form>
  )
}

export default GroupForm
