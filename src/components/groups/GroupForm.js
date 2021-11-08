import { useState } from 'react'

const GroupForm = ({ addGroup }) => {
  const [name, setName] = useState('')
  /* const [isOpen, setIsOpen] = useState(false) */

  const hanldeSubmit = (e) => {
    e.preventDefault()

    const params = {
      name
    }

    addGroup(params)
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
      {/* <div className="col-auto">
        <label htmlFor="name">¿Está abierto?:</label>
      </div>
      <div className="col-auto">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
      </div> */}
      <div className="col">
        <button type="submit" className="btn btn-success form-control">Agregar</button>
      </div>

    </form>
  )
}

export default GroupForm
