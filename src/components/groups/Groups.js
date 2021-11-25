import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import groupsService from "../../services/groups.service"
import GroupForm from "./GroupForm"

import "./group.css"

const Groups = ({ user }) => {
  const [groups, setGroups] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

  useEffect(() => {
    const getGroups = async () => {
      const groupsFromServer = await fethGroupsByTeacher(user.id)
      setGroups(groupsFromServer)
    }
    getGroups()
  }, [user.id])

  const fethGroupsByTeacher = async (teacherId) => {
    const groupsFromServer = await groupsService.getGroupsByUser(teacherId)
    return groupsFromServer
  }

  const deleteGroup = async (groupId) => {
    const yes = window.confirm("¿Realmente deseas borrar el grupo?")
    if (yes) {
      await groupsService.deleteGroup(groupId)
      setGroups(groups.filter((group) => group._id !== groupId))
    }
  }

  const addGroup = async (params) => {
    params.teacher = user.id
    const newGroup = await groupsService.addGroup(params)
    setGroups([...groups, newGroup])
  }

  const copyToClipboard = (e) => {
    const text = e.target.innerHTML
    navigator.clipboard.writeText(text)
    window.alert("Se ha copiado el código de acceso al grupo")
  }

  const handleEdit  = (group) => {
    setShowForm(false)
    setSelectedGroup(group)
    setGroups([group])
    setShowForm(true)
  }

  const handleHide  = async () => {
    setShowForm(!showForm)
    if(selectedGroup) {
      const groups = await fethGroupsByTeacher(user.id)
      setGroups(groups)
      setSelectedGroup(null)
    }
  }

  const updateGroup = async (groupId, params) => {
    await groupsService.updateGroup(groupId, params)
    
    const groups = await fethGroupsByTeacher(user.id)
    setGroups(groups)

    setShowForm(false)
    setSelectedGroup(null)
  }

  return (
    <div className="container mt-4 p-4">
      <div className="row align-items-center">
        <div className="col">
          <h2>Tabla de grupos</h2>
        </div>
        <div className="col text-end">
          <button
            className={showForm ? "btn btn-secondary" : "btn btn-success"}
            onClick={handleHide}
          >
            {showForm ? "Cancelar" : "Agregar grupo"}
          </button>
        </div>
      </div>
      {showForm && <GroupForm addGroup={addGroup} updateGroup={updateGroup} group={selectedGroup} />}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Grupo</th>
              <th>No inscritos</th>
              <th>Estado</th>
              <th>Clave de acceso</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{group.name}</td>
                <td>{group.students.length}</td>
                <td>{group.isOpen ? "Abierto" : "Cerrado"}</td>
                <td>
                  <span className="copy-code btn" onClick={copyToClipboard}>{group._id}</span>
                </td>
                <td>
                  <Link className={`btn btn-dark ${selectedGroup && 'disabled'}`} to={`/group/${group._id}`}>
                    Ver alumnos
                  </Link>
                </td>
                <td>
                  <button type="button" 
                    className="btn btn-primary" 
                    onClick={() => handleEdit(group)} 
                    disabled={selectedGroup ? true : false} >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteGroup(group._id)}
                    disabled={selectedGroup ? true : false}
                  >
                    Eliminar
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

export default Groups
