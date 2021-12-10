import { useState } from "react";
import svgIcon from "../../lib/svgIcons";

import "./groups.css";

const GroupForm = ({ addGroup, updateGroup, group }) => {
  const [name, setName] = useState(group ? group.name : "");

  const hanldeSubmit = (e) => {
    e.preventDefault();

    if (group) {
      const params = {
        name,
        students: group.students,
        teacher: group.teacher,
      };
      updateGroup(group._id, params);
    } else {
      const params = {
        name
      };

      addGroup(params);
    }

    setName("");
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
      <div className="col-3">
        <button type="submit" className="btn btn-success form-control">
          {group ? (
            <>
              {svgIcon.confirm}
              Actualizar
            </>
          ) : (
            <>
              {svgIcon.add}
              Agregar
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default GroupForm;
