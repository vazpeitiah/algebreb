import { useState } from 'react'

const AddStudent = ({addStudent}) => {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addStudent(username)
    setUsername('')
  }

  return (
    <form className="row align-items-center border rounded p-2" onSubmit={handleSubmit}>
      <div className="col-auto">
        <label htmlFor="username">Nombre de usuario</label>
      </div>
      <div className="col">
        <input type="text" 
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required/>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success form-control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-square-fill me-2"
            viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
          Inscribir
        </button>
      </div>
    </form>
  )
}

export default AddStudent
