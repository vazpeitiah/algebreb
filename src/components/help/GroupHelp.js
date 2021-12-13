import React from "react";
import AddGroup from "../../assets/help/newgroup.png";
import Group from "../../assets/help/groups.png";
import Students from "../../assets/help/students.png";
import Student from "../../assets/help/student.png";

export const GroupHelp = () => {
  return (
    <div>
      <h1 className="display-6 text-center pt-4 pb-3">Grupos</h1>
      <hr className="mb-5" />
      En al sección Grupos puede agregar, editar y eliminar grupos, también
      puede inscribir estudiantes a los grupos o pasar un código para que los
      estudiantes se puedan inscribir.
      <div className="py-4">
        <h1 className="fs-3 pt-4 pb-2">Agregar una nuevo grupo.</h1>
        Para crear un nuevo grupo de click en el botón{" "}
        <label className="fw-bold">Agregar grupo</label>, al dar click se abrirá
        el siguiente formulario.
        <div className="text-center py-3">
          <img
            src={AddGroup}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        En el formulario solo tiene que ingresar el{" "}
        <label className="fw-bold">Nombre</label> para poder agregar el grupo,
        una vez agregado aparecerá en la tabla.
        <div className="text-center py-3">
          <img
            src={Group}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        Una vez creado puede editar, eliminar o inscribir alumnos al grupo, cada
        grupo cuenta con una <label className="fw-bold">clave de acceso</label>
        la cual puede distribuir a los alumnos para que se puedan inscribir al
        grupo.
      </div>
      <div className="py-4">
        <h1 className="fs-3 pt-4 pb-2">Inscribir estudiantes.</h1>
        Para inscribir estudiantes a un grupo de click en el botón{" "}
        <label className="fw-bold">Ver alumnos</label>, al dar click se abrirá
        la siguiente ventana.
        <div className="text-center py-3">
          <img
            src={Students}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        En el formulario tiene que ingresar el{" "}
        <label className="fw-bold">Nombre de usuario</label> del estudiante para
        poder agregarlo el grupo, una vez agregado aparecerá en la tabla.
        <div className="text-center py-3">
          <img
            src={Student}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        Una vez agregado puede ver el kardex del estudiante o eliminarlo del
        grupo, en el kardex podrá ver las calificaciones en los examenes o
        tareas asignadas de cada estudiante.
      </div>
    </div>
  );
};
