import { useState, useEffect } from "react"
import groupsService from "../../services/groups.service"
import EnrollGroup from "./EnrollGroup"

const GroupsStudent = ({ user }) => {
  const [groups, setGroups] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const getGroup = async () => {
      const response = await fetchGroupsForStudent(user.id)
      if(response && response.success) {
        setGroups(response.groups)
      }
    }

    getGroup()
  }, [user.id])

  const fetchGroupsForStudent = async (studentId) => {
    const res = await groupsService.getGroupsByStudent(studentId)
    return res
  }

  const enrollGroup = async (keyCourse) => {
    const response = await groupsService.enrollStudent(keyCourse, user.username)
    if(response && response.success) {
      const response = await fetchGroupsForStudent(user.id)
      if(response && response.success) {
        setGroups(response.groups)
      }
    } else {
      window.alert(`Error: ${response.message}`)
    }
  }
  
  return (
    <div className="container mt-4 p-4 animate__animated animate__fadeInUp">
      <div className="row align-items-center">
        <div className="col">
          <h2>Tabla de grupos</h2>
        </div>
        <div className="col text-end">
          <button
            className={showForm ? "btn btn-secondary" : "btn btn-success"}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Ocultar" : "Inscribirse a grupo"}
          </button>
        </div>
      </div>
      {showForm && <EnrollGroup enrollGroup={enrollGroup}/> }
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Grupo</th>
              <th>Profesor</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{group.name}</td>
                <td>{group.teacher.name}</td>
                <td>
                  <button className="btn btn-primary">
                    Kardex
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">
                    Abandonar grupo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {groups.length === 0 && (
            <caption>No se han encontrado grupos</caption>
          )}
        </table>
      </div>
    </div>
  )
}

export default GroupsStudent
