import React from 'react'

/* react-katex */
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const ShowSolution = ({exercise, id}) => {
  const solutionId = "solution" + id;

  return (
    <div className="collapse" id={solutionId} aria-hidden="true">
      
      <div className="card card-body m-3 border-info">
        <h5 className="card-title"> <b>Ejercicio:{" "}</b> {exercise && (<InlineMath>{exercise.enunciado}</InlineMath>)}</h5>
        <ol>
          {exercise.pasos && exercise.pasos.map((paso, index) => (
            <li key={index}><InlineMath math={String(paso)} /> </li>)
          )}
        </ol>
        <p className="fw-bolder"><b>Solución final:</b> <InlineMath>{exercise && String(exercise.solucion)}</InlineMath></p>     
      </div>
    </div>
  )
}

export default ShowSolution
