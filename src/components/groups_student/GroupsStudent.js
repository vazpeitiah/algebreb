import { useState, useEffect } from "react";
import svgIcon from "../../lib/svgIcons";
import groupsService from "../../services/groups.service";
import EnrollGroup from "./EnrollGroup";
import Kardex from "./Kardex";

const GroupsStudent = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const getGroup = async () => {
      const response = await fetchGroupsForStudent(user.id);
      if (response && response.success) {
        setGroups(response.groups);
      }
    };

    getGroup();
  }, [user.id]);

  const fetchGroupsForStudent = async (studentId) => {
    const res = await groupsService.getGroupsByStudent(studentId);
    return res;
  };

  const enrollGroup = async (keyCourse) => {
    const response = await groupsService.enrollStudent(
      keyCourse,
      user.username
    );
    if (response && response.success) {
      const response = await fetchGroupsForStudent(user.id);
      if (response && response.success) {
        setGroups(response.groups);
      }
    } else {
      window.alert(`Error: ${response.message}`);
    }
  };

  const unsubscribe = async (studentId, group) => {
    const confirm = window.confirm("¿Realmente deseas dejar el grupo?");
    if (confirm) {
      const params = {
        name: group.name,
        teacher: group.teacher._id,
        students: group.students.filter((student) => student !== studentId),
        isOpen: group.isOpen,
      };
      console.log(params);
      const updatedGroup = await groupsService.updateGroup(group._id, params);
      console.log(updatedGroup);
      setGroups(groups.filter((group) => group._id !== updatedGroup._id));
    }
  };

  return (
    <div className="container mt-4 p-4">
      <div className="row align-items-center">
        <div className="col">
          <h2>Tabla de grupos</h2>
        </div>
        <div className="col text-end">
          <button
            className={showForm ? "btn btn-secondary" : "btn btn-success"}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <>
                {svgIcon.cancel}
                Cancelar
              </>
            ) : (
              <>
                {svgIcon.add}
                Inscribirse a grupo
              </>
            )}
          </button>
        </div>
      </div>
      {showForm && <EnrollGroup enrollGroup={enrollGroup} />}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
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
                    <button
                      className="btn btn-primary col-10"
                      data-bs-toggle="modal"
                      data-bs-target="#kardex-student"
                      onClick={() => setSelectedGroup(group._id)}
                    >
                      {svgIcon.kardex}
                      Kardex
                    </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => unsubscribe(user.id, group)}
                  >
                    {svgIcon.exit}
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
      <Kardex student={user.id} group={selectedGroup} />
    </div>
  );
};

export default GroupsStudent;
