import { useState } from 'react'
import svgIcon from '../../lib/svgIcons'

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
          {svgIcon.add}
          Inscribir
        </button>
      </div>
    </form>
  )
}

export default AddStudent
