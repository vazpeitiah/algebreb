import React from 'react'

/* react-katex */
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const ShowSolution = ({exercise}) => {
  return (
    <div className="modal fade" id="SolutionModal" aria-hidden="true">
      <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Solucion del ejercicio {exercise && (<InlineMath>{exercise.enunciado}</InlineMath>)}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <p>Para resolver el ejercicios siga los pasos siguientes.</p>
          <span> <b>Ejercicio</b> {exercise && (<InlineMath>{exercise.enunciado}</InlineMath>)}</span>
          <ol>
            {exercise && exercise.pasos.map((paso, index) => (
              <li key={index}><InlineMath math={paso} /> </li>)
            )}
          </ol>
          <p><b>Solución final:</b> <InlineMath>{exercise && exercise.solucion}</InlineMath></p>     
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ShowSolution
