import { useState, useEffect } from "react"
import groupsService from "../../services/groups.service"
import GroupForm from "./GroupForm"

const Groups = ({user}) => {
  const [groups, setGroups] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const getGroups = async () => {
      const groupsFromServer = await groupsService.getGroupsByUser(user.id)
      setGroups(groupsFromServer)
    }
    getGroups()
  }, [user.id])

  const deleteGroup = async (groupId) => {
    const yes = window.confirm("¿Realmente deseas borrar el grupo?")
    if(yes) {
      await groupsService.deleteGroup(groupId)
      setGroups(groups.filter(group => group._id !== groupId))
    }
  }

  const addGroup = async (params) => {
    params.teacher = user.id
    const newGroup = await groupsService.addGroup(params)
    setGroups([...groups, newGroup])
  }

  return (
    <div className="container mt-4 p-4">
      <div className='row align-items-center'>
				<div className='col'>
					<h2>Tabla de grupos</h2>
				</div>
				<div className='col text-end'>
					<button className={showForm ? "btn btn-secondary" : "btn btn-success"}
						onClick={() => setShowForm(!showForm)}>
						{showForm ? "Ocultar" : "Agregar grupo"}
					</button>
				</div>
			</div>
      {showForm && <GroupForm addGroup={addGroup}/>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Grupo</th>
            <th>No inscritos</th>
            {/* <th>Estado</th> */}
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groups.length !== 0 && groups.map((group, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{group.name}</td>
              <td>{group.students.length}</td>
              {/* <td>{group.isOpen ? "Abierto" : "Cerrado"}</td> */}
              <td><button className="btn btn-secondary">Ver alumnos</button></td>
              <td><button className="btn btn-primary">Editar</button></td>
              <td>
                <button className="btn btn-danger"
                  onClick={() => deleteGroup(group._id)} >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {groups.length === 0 && (<caption>No se han encontrado grupos</caption>)}
      </table>
    </div>
  )
}

export default Groups
