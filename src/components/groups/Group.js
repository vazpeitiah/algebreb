import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import groupsService from "../../services/groups.service"
import AddStudent from "./AddStudent"

const Group = () => {
  const { groupId } = useParams()
  const [currentGroup, setCurrentGroup] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const getCurrentGroup = async () => {
      const group = await groupsService.getGroupById(groupId)
      if(group) {
        setCurrentGroup(group)
      }
    }
    getCurrentGroup()
  }, [groupId])
  
  const deleteStudent = async (studentId) => {
    const confirmDeleted = window.confirm("¿Realmente desea eliminar al estudiante?")
    if(confirmDeleted) {
      currentGroup.students = currentGroup.students.filter(student => student._id !== studentId)
      const updatedGroup = await groupsService.updateGroup(currentGroup._id, currentGroup)
      setCurrentGroup(updatedGroup)
    }
  }

  const addStudent = async (username) => {
    const response = await groupsService.enrollStudent(currentGroup._id, username)
    if(response && response.success) {
      setCurrentGroup(response.group)
    } else {
      window.alert(`Error: ${response.message}`)
    }
  }

  return (
    <div className="container mt-4 p-4">
      <div className="row align-items-center mb-2">
        <div className="col">
          <h2>Grupo {currentGroup && currentGroup.name}</h2>
        </div>
        <div className="col text-end">
          <button className={showForm ? "btn btn-secondary" : "btn btn-success"}
            onClick={() => setShowForm(!showForm)}>
            {showForm ? "Ocultar" : "Inscribir estudiante"}
          </button>
        </div>
      </div>
      {showForm && <AddStudent addStudent={addStudent}/> }
      <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentGroup && currentGroup.students.map((student, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{student.name}</td>
              <td>{student.username}</td>
              <td>
                <button className="btn btn-primary">
                  Kardex
                </button>
              </td>
              <td><button className="btn btn-danger" onClick={() => deleteStudent(student._id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
        {currentGroup && currentGroup.students.length === 0 && (<caption>No hay alumnos inscritos</caption>)}
      </table>
      </div>
    </div>
  )
}

export default Group