import React from 'react'

/* react-katex */
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const ShowSolution = ({exercise}) => {
  return (
    <div class="modal fade" id="SolutionModal" aria-hidden="true">
      <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Solucion del ejercicio {exercise && (<InlineMath>{exercise.enunciado}</InlineMath>)}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Para resolver el ejercicios siga los pasos siguientes.</p>
          <span> <b>Ejercicio</b> {exercise && (<InlineMath>{exercise.enunciado}</InlineMath>)}</span>
          <ol>
            {exercise && exercise.pasos.map((paso, index) => (
              <li key={index}><InlineMath math={paso} /> </li>)
            )}
          </ol>
          <p><b>Solución final:</b> <InlineMath>{exercise && exercise.solucion}</InlineMath></p>     
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ShowSolution
