import { useState } from "react"

const SheetForm = ({ addSheet, user }) => {
  const [description, setDescription] = useState('')
  const [type, setType] = useState('lista_ejercicios')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = {
      description, type
    }

    addSheet(params)
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row border rounded p-2">
        <h3>Agregar una nueva hoja</h3>
        <div className="col-lg-4">
          <label htmlFor="description">Description:</label>
          <input type="text"
            className="form-control"
            id="description"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            required />
        </div>

        <div className="col-lg-4">
          <label htmlFor="type">Tipo de hoja:</label>
          <select id="type"
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value="lista_ejercicios">Lista de ejercicios</option>
            {user && user.roles.includes('profesor') && (
              <>
                <option value="examen">Examen</option>
                <option value="tarea">Tarea</option>
              </>
            )}
          </select>
        </div>

        <div className="col-lg-4">
          <label htmlFor="type"> &nbsp;</label>
          <button type="submit" className="btn btn-success form-control">Agregar hoja</button>
        </div>
      </div>
    </form>
  )
}

export default SheetForm
