import {useState} from 'react'

const EnrollGroup = ({enrollGroup}) => {
  const [keyCourse, setKeyCourse] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    enrollGroup(keyCourse)
    setKeyCourse('')
  }

  return (
    <form className="row align-items-center border rounded p-2" onSubmit={handleSubmit}>
      <div className="col-auto">
        <label htmlFor="keyCourse">Clave del curso</label>
      </div>
      <div className="col">
        <input type="text" 
          placeholder="Clave de accesso"
          className="form-control"
          value={keyCourse}
          onChange={(e) => setKeyCourse(e.target.value)}
          required/>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success form-control">Inscribir</button>
      </div>
    </form>
  )
}

export default EnrollGroup
