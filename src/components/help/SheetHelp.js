import React from "react";
import AddSheet from "../../assets/help/addsheet.png";
import AddedSheet from "../../assets/help/addedsheet.png";
import EditSheet from "../../assets/help/editsheet.png";
import AddExercise from "../../assets/help/addexercise.png";
import FormAddExe from "../../assets/help/formaddexe.png";
import SetSheet from "../../assets/help/setsheet.png";
import CardView from "../../assets/help/cardview.png";
import CardSolution from "../../assets/help/cardsolution.png";
import Solution from "../../assets/help/solutions.png";
import Export from "../../assets/help/export.png";

export const SheetHelp = () => {
  return (
    <div>
      <h1 className="display-6 text-center pt-4 pb-3">Hojas</h1>
      <hr className="mb-5" />
      En al sección Hojas puede agregar, editar y eliminar las hojas (listas de
      ejercicios, tareas y examenenes), la primera vez que ingrese la tabla se
      mostrará vacía.
      <div className="py-4">
        <h1 className="fs-3 pt-4 pb-2">Agregar una hoja nueva.</h1>
        Para crear una nueva hoja de click en{" "}
        <label className="fw-bold">Agregar hoja</label>, al dar click se abrirá
        el siguiente formulario.
        <div className="text-center py-3">
          <img
            src={AddSheet}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        Tiene que ingresar el <label className="fw-bold">Nombre</label> y
        seleccionar el <label className="fw-bold">Tipo de hoja</label> para
        poder agregar la hoja, una vez agregada aparecerá en la tabla.
        <div className="text-center py-3">
          <img
            src={AddedSheet}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        Las hojas una vez agregadas, pueden ser exportadas, editadas o
        eliminadas.
      </div>
      <div className="py-4">
        <h1 className="fs-3 pt-4 pb-2">Editar una hoja nueva.</h1>
        Para editar la hoja se da click en el botón{" "}
        <label className="fw-bold">editar</label> en la{" "}
        <label className="fw-bold">Tabla de hojas</label>, al dar click se
        cargará la siguiente página.
        <div className="text-center py-3">
          <img
            src={EditSheet}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        La primera vez que ingrese la hoja se mostrará vacía.
        <div className="py-3">
          <h1 className="fs-4 pt-4 pb-2">Agregar ejercicios.</h1>
          Para agregar ejercicios, en las opciones del lado izquierdo ubique la
          sección <label className="fw-bold">Agregar ejercicios</label>:
          <div className="text-center py-3">
            <img
              src={AddExercise}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="300"
            />
          </div>
          Dentro de estas opciones primero seleccione el tema y el subtema de
          los ejercicios que desee agregar, ahora de click en el botón{" "}
          <label className="fw-bold">Agregar ejercicios</label>, al dar click se
          abriará la siguiente ventana.
          <div className="text-center py-3">
            <img
              src={FormAddExe}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="600"
            />
          </div>
          Llene el formulario con las características que desee, y de click en{" "}
          <label className="fw-bold">Agregar</label>, los ejercicios agregados
          aparecerán en la hoja.
        </div>
        <div className="py-3">
          <h1 className="fs-4 pt-4 pb-2">Eliminar ejercicios.</h1>
          Los ejercicios se puden eliminar individualmente o se pueden eliminar
          todos, para eliminarlos todos, se ubica la sección{" "}
          <label className="fw-bold">Configurar hoja</label> y se da click en{" "}
          <label className="fw-bold">Vaciar hoja</label>.
          <div className="text-center py-3">
            <img
              src={SetSheet}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="300"
            />
          </div>
          Para eliminar los ejercicios individualemte se da click al
          interrumptor, ubicado en la parte superior derecha,{" "}
          <label className="fw-bold">Vista de cartas</label>, al dar click la
          hoja cambiara a vista de cartas y cada ejercicio tendrá el botón{" "}
          <label className="fw-bold">Eliminar</label>.
          <div className="text-center py-3">
            <img
              src={CardView}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="1000"
            />
          </div>
          Para eliminar el ejercicio solo de click en el botón{" "}
          <label className="fw-bold">Eliminar</label>.
        </div>
        Cada que agregue o elimine ejercicios, guarde los cambios, dando click
        en el botón <label className="fw-bold">Guardar.</label>
        <div className="py-3">
          <h1 className="fs-4 pt-4 pb-2">Cambiar tipo de hoja.</h1>
          Las hojas puden ser de tipo Lista de ejercicios, Tarea y Examen, para
          cambiar el tipo de hoja ubique la sección{" "}
          <label className="fw-bold">Configurar hoja</label>, seleccione el tipo
          de hoja a la que quiera cambiar y guarde los cambios en el botón{" "}
          <label className="fw-bold">Guardar.</label>
          <div className="text-center py-3">
            <img
              src={SetSheet}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="300"
            />
          </div>
        </div>
        <div className="py-3">
          <h1 className="fs-4 pt-4 pb-2">Solución de los ejercicios.</h1>
          Para obtener la solución de los ejercicios, ubique la sección{" "}
          <label className="fw-bold">Configurar hoja</label>, seleccione el tipo
          de solución que desee obtener e inmediatamente apareceran las
          solcuiones en la hoja. <label className="fw-bold">Guardar.</label>
          <div className="text-center py-3">
            <img
              src={Solution}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="600"
            />
          </div>
          En la vista de cartas, primero seleecione la solución que desee y
          despues de click en el interruptor{" "}
          <label className="fw-bold">Vista de cartas</label>, y para ver la
          solución de click en el botón{" "}
          <label className="fw-bold">Solución</label>
          <div className="text-center py-3">
            <img
              src={CardSolution}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="1000"
            />
          </div>
        </div>
        <div className="py-3">
          <h1 className="fs-4 pt-4 pb-2">Exportar hoja.</h1>
          Puede exportar hojas en formato PDF, LATEX y/o PNG, para exportar
          ubique la sección <label className="fw-bold">Exportar hoja</label>,
          seleccione el formato a exportar y de click en
          <div className="text-center py-3">
            <img
              src={Export}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="300"
            />
          </div>
          Dependiendo del formato seleccionado se descargará el archivo.
        </div>
      </div>
    </div>
  );
};
