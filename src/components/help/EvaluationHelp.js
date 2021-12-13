import React from "react";
import ApplyEvaluation from "../../assets/help/applyevaluation.png";
import Evaluation from "../../assets/help/evaluation.png";
import StudentsEvaluation from "../../assets/help/studentsevaluation.png";
import ApplyEv from "../../assets/help/applyev.png";
import ReviewS from "../../assets/help/reviews.png";

export const EvaluationHelp = () => {
  return (
    <div>
      <h1 className="display-6 text-center pt-4 pb-3">Evaluaciones</h1>
      <hr className="mb-5" />
      Las evaluaciones solo se pueden crear por los profesores, estas pueden ser
      tareas o examenes, en la sección Evaluaciones se pueden editar y eliminar
      las evalueaciones, para agregar evaluaciones se tiene que hacer desde
      hojas y se tiene que contar con un grupo que tenga al menos un estudiante,
      de otra forma no se podrá aplicar la evaluación.
      <div className="py-4">
        <h1 className="fs-3 pt-4 pb-2">Agregar una nueva evalución.</h1>
        Para agregar una evaluación, se agrega o edita una nueva hoja y se
        específica que sea tarea o examen, una vez especificado en editar hoja
        se habilitara una sección llamada{" "}
        <label className="fw-bold">Aplicar evaluación.</label>
        <div className="text-center py-3">
          <img
            src={ApplyEvaluation}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="300"
          />
        </div>
        Para aplicar la evaluación se específica la fecha de inicio y fin de la
        evaluación, por defecto se da un día para terminar la evaluación, esto
        se puede cambiar dando click en la fecha de inicio o fin, se selecciona
        el grupo, por defecto se generan diferentes ejercicios con los mismos
        parámetros, esto se puede cambiar desmarcando la casilla de{" "}
        <lavel className="fw-bold">Cambiar los ejercicios para cada alumno</lavel>,
        y se da click en aplicar, se preguntará si desea iniciar la evaluación y
        se confirma dando en si.
        <br />
        <br />
        Una vez aplicada, al profesor le aparecerá en evaluaciones.
        <div className="text-center py-3">
          <img
            src={Evaluation}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        Si es estudiante le aparecerá de la siguiente forma:
        <div className="text-center py-3">
          <img
            src={StudentsEvaluation}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        El estudiante podrá responder las evaluaciones, la evaluación se mostrará:
        <div className="text-center py-3">
          <img
            src={ApplyEv}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        Las respuestas son de opción multiple y se pude subir el procedimiento
        en imágenes para que el profesor lo pueda revisar, una vez contestado
        puede ver su calificación y lo puede revisar, la revisión se  muestra: 
        <div className="text-center py-3">
          <img
            src={ReviewS}
            className="img-fluid img-thumbnail center"
            alt="Formulario de registro"
            width="1000"
          />
        </div>
        En la revisión tanto el estudiante como el profesor pueden ver la solución paso a paso, la retroalimentación y revisar las imágenes subidas.
      </div>
    </div>
  );
};
