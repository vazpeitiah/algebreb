import { useState } from "react";

import "./groups.css";

const GroupForm = ({ addGroup, updateGroup, group }) => {
  const [name, setName] = useState(group ? group.name : "");
  const [isOpen, setIsOpen] = useState(group ? group.isOpen : false);

  const hanldeSubmit = (e) => {
    e.preventDefault();

    if (group) {
      const params = {
        name,
        isOpen,
        students: group.students,
        teacher: group.teacher,
      };
      updateGroup(group._id, params);
    } else {
      const params = {
        name,
        isOpen,
      };

      addGroup(params);
    }

    setName("");
    setIsOpen(false);
  };

  return (
    <form
      onSubmit={hanldeSubmit}
      className="row align-items-center border rounded p-2"
    >
      <div className="col-auto">
        <label htmlFor="name">Nombre del grupo:</label>
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del grupo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <label htmlFor="name">¿Está abierto?:</label>
      </div>
      <div className="col-auto">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className="col-3">
        <button type="submit" className="btn btn-success form-control">
          {group ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check-square-fill me-2"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
              </svg>
              Actualizar
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle-fill me-2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
              Agregar
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default GroupForm;
