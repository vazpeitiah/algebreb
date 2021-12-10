import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import svgIcon from "../../lib/svgIcons"
import groupsService from "../../services/groups.service"
import Kardex from "../groups_student/Kardex"
import AddStudent from "./AddStudent"

const Group = () => {
  let history = useHistory()
  const { groupId } = useParams()
  const [currentGroup, setCurrentGroup] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [student, setStudent] = useState(null)

  useEffect(() => {
    const getCurrentGroup = async () => {
      const res = await groupsService.getGroupById(groupId)
      if(res && res.success) {
        setCurrentGroup(res.group)
      } else {
        window.alert(res.message)
      }
    }
    getCurrentGroup()
  }, [groupId])

  const addStudent = async (username) => {
    const res = await groupsService.enrollStudent(currentGroup._id, username)
    if(res && res.success) {
      setCurrentGroup(res.group)
    } else {
      window.alert(`Error: ${res.message}`)
    }
  }
  
  const deleteStudent = async (studentId) => {
    const confirm = window.confirm("¿Realmente deseas eliminar al estudiante?")
    if(confirm) {
      currentGroup.students = currentGroup.students.filter(student => student._id !== studentId)
      const res = await groupsService.updateGroup(currentGroup._id, currentGroup)
      if(res && res.success) {
        setCurrentGroup(res.group)
      } else {
        window.alert(`Error: ${res.message}`)
      }
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
            {showForm ? <>
              {svgIcon.cancel}
              Cancelar
            </> : <>
              {svgIcon.enroll}
              Inscribir estudiante
            </>}
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => history.goBack()}>
            {svgIcon.back}
            Regresar
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
                <button className="btn btn-primary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#kardex-student"
                  onClick={() => setStudent(student._id)}>
                  {svgIcon.kardex}
                  Kardex
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteStudent(student._id)}>
                  {svgIcon.delete}
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {currentGroup && currentGroup.students.length === 0 && (<caption>No hay alumnos inscritos</caption>)}
      </table>
      </div>
      <Kardex student={student} group={groupId}/>
    </div>
  )
}

export default Group