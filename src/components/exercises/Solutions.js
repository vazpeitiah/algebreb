import 'katex/dist/katex.min.css';
/* import { useState } from 'react'; */
import { InlineMath } from 'react-katex';

const Solutions = ({exercises, tipoSolucion}) => {
  return (
    <>
      <h3>Soluciones</h3>
      {exercises && exercises.map((ex, idx) => (
        <div className="row" key={idx}>
          <h5>{ex.instrucciones}</h5>
          {ex.exercisesArr.map((exercise, index) => (
            <div key={index}>
              <span><b>{index + 1})</b><InlineMath math={exercise.enunciado} /></span>
              {(tipoSolucion === "pasos" || tipoSolucion === "solo_respuestas") && (
                <ol>
                {exercise.pasos && exercise.pasos.map((paso, index) => (
                  <li key={index}><InlineMath math={paso} /> </li>)
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
