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
    <form onSubmit={handleSubmit} 
      className="row align-items-center border rounded p-2">
      <div className="col-auto">
        <label htmlFor="description">Nombre:</label>
      </div>
      <div className="col">
        <input type="text"
          className="form-control"
          id="description"
          placeholder="Nombre de la hoja"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="off"
          required />
      </div>

      <div className="col-auto">
        <label htmlFor="type">Tipo de hoja:</label>
      </div>

      <div className="col-auto">
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

      <div className="col-lg-3">
        <button type="submit" className="btn btn-success form-control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-square-fill me-2"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
          Agregar hoja
        </button>
      </div>
    </form>
  )
}

export default SheetForm
