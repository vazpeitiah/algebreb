import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import groupsService from "../../services/groups.service";
import GroupForm from "./GroupForm";
import ClipboardJS from "clipboard";

import "./groups.css";

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

    if (copyIcon.className === "copy-id bi bi-check-lg link-algebreb ps-3") {
      copyIcon.className = "copy-id bi bi-clipboard link-algebreb ps-3";
      copyIcon.title = "Copiar";
    } else {
      copyIcon.className = "copy-id bi bi-check-lg link-algebreb ps-3";
      copyIcon.title = "Copiado";

      setTimeout(() => {
        copyIcon.className = "copy-id bi bi-clipboard link-algebreb ps-3";
        copyIcon.title = "Copiar";
      }, 1000);
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
            {showForm ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-square-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                </svg>
                Cancelar
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
                Agregar grupo
              </>
            )}
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
        <table className="table table-stipped">
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
                    className="copy-id bi bi-clipboard link-algebreb ps-3"
                    title="Copiar"
                    data-clipboard-action="copy"
                    data-clipboard-text={group._id}
                    onClick={copyToClipboard}
                  />
                </td>
                <td>
                  <Link
                    className={`btn btn-watch ${selectedGroup && "disabled"}`}
                    to={`/group/${group._id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-fill me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                    Ver alumnos
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary col-lg-12"
                    onClick={() => handleEdit(group)}
                    disabled={selectedGroup ? true : false}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger col-sm-11"
                    onClick={() => deleteGroup(group._id)}
                    disabled={selectedGroup ? true : false}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
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
