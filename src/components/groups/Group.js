import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import groupsService from "../../services/groups.service"
import Kardex from "../groups_student/Kardex"
import AddStudent from "./AddStudent"

const Group = () => {
  const { groupId } = useParams()
  const [currentGroup, setCurrentGroup] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [student, setStudent] = useState(null)

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
            {showForm ? <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="bi bi-x-square-fill me-2" 
                viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
						  </svg>
              Cancelar
            </> : <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill me-2" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
              Inscribir estudiante
            </>}
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
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-file-earmark-text-fill me-2" 
                    viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
                  </svg>
                  Kardex
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteStudent(student._id)}>
                  <svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-trash-fill me-2"
										viewBox="0 0 16 16">
										<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
									</svg>
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