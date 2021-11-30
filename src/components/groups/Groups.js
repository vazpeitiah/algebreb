import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import groupsService from "../../services/groups.service";
import GroupForm from "./GroupForm";
import ClipboardJS from "clipboard";

import "./group.css";

//Essential to copy group key
new ClipboardJS("#copy-id");

const Groups = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const getGroups = async () => {
      const groupsFromServer = await fethGroupsByTeacher(user.id);
      setGroups(groupsFromServer);
    };
    getGroups();
  }, [user.id]);

  const fethGroupsByTeacher = async (teacherId) => {
    const groupsFromServer = await groupsService.getGroupsByUser(teacherId);
    return groupsFromServer;
  };

  const deleteGroup = async (groupId) => {
    const yes = window.confirm("¿Realmente deseas borrar el grupo?");
    if (yes) {
      await groupsService.deleteGroup(groupId);
      setGroups(groups.filter((group) => group._id !== groupId));
    }
  };

  const addGroup = async (params) => {
    params.teacher = user.id;
    const newGroup = await groupsService.addGroup(params);
    setGroups([...groups, newGroup]);
  };

  const copyToClipboard = (e) => {
    const copyIcon = document.getElementById("copy-id");

    if (copyIcon.className === "bi bi-check-lg link-algebreb ps-3") {
      copyIcon.className = "bi bi-clipboard link-algebreb ps-3";
      copyIcon.title = "Copiar";
    } else {
      copyIcon.className = "bi bi-check-lg link-algebreb ps-3";
      copyIcon.title = "Copiado";
    }
  };

  const handleEdit = (group) => {
    setShowForm(false);
    setSelectedGroup(group);
    setGroups([group]);
    setShowForm(true);
  };

  const handleHide = async () => {
    setShowForm(!showForm);
    if (selectedGroup) {
      const groups = await fethGroupsByTeacher(user.id);
      setGroups(groups);
      setSelectedGroup(null);
    }
  };

  const updateGroup = async (groupId, params) => {
    await groupsService.updateGroup(groupId, params);

    const groups = await fethGroupsByTeacher(user.id);
    setGroups(groups);

    setShowForm(false);
    setSelectedGroup(null);
  };

  return (
    <div className="container mt-4 p-4 animate__animated animate__fadeInUp">
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
      {showForm && (
        <GroupForm
          addGroup={addGroup}
          updateGroup={updateGroup}
          group={selectedGroup}
        />
      )}
      <div className="table-responsive">
        <table className="table table-striped" id="table" data-toggle="table">
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
                  {group._id}
                  <i
                    id="copy-id"
                    className="bi bi-clipboard link-algebreb ps-3"
                    title="Copiar"
                    data-clipboard-action="copy"
                    data-clipboard-text={group._id}
                    onClick={copyToClipboard}
                  />
                </td>
                <td>
                  <Link
                    className={`btn btn-dark ${selectedGroup && "disabled"}`}
                    to={`/group/${group._id}`}
                  >
                    Ver alumnos
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEdit(group)}
                    disabled={selectedGroup ? true : false}
                  >
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
  );
};

export default Groups;
