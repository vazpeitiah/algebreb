import 'katex/dist/katex.min.css';
/* import { useState } from 'react'; */
import { InlineMath } from 'react-katex';

const Solutions = ({exercises, solutionsType, numberExercises}) => {
  const numberClass = "col-md-" + numberExercises + " p-2";

  return (
    <>
      <h3>Soluciones</h3>
      {exercises && exercises.map((ex, idx) => (
        <div className="row" key={idx}>
          <h5>{ex.instrucciones}</h5>
          {ex.exercisesArr.map((exercise, index) => (
            <div key={index} className={numberClass}>
              <span><b>{index + 1})</b><InlineMath math={exercise.enunciado} /></span>
              {(solutionsType === "pasos" || solutionsType === "solo_respuestas") && (
                <ol>
                {exercise.pasos && exercise.pasos.map((paso, index2) => (
                  <li key={index2}><InlineMath math={paso} /> </li>)
                )}
                </ol>
              )}
              <p><b>Solución:</b> <InlineMath math={exercise.solucion} /> </p>
            </div>
          ))}
          {ex.exercisesArr.length === 0 && (<p> No se han agregado ejercicios</p>)}
        </div>
      ))}
    </>
  )
}

export default Solutions
