import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import svgIcon from "../../lib/svgIcons";
import CardSolution from "./CardSolution";

const CardExercise = ({ exercise, index, gIndex, number, solutionType, numberExercises, tipoRespuesta, deleteExercise }) => {
    const numberClass = "col-md-" + numberExercises + " p-2";
    console.log(solutionType);

    return (
        <div className={numberClass}>
            <div key={index} className="card m-2 pt-2">
                {exercise.enunciado && (
                    <div className="card-header d-flex justify-content-between">
                        <h6 className="pt-2">
                            <b>{number})</b> <InlineMath math={exercise.enunciado} />
                        </h6>
                    </div>
                )}
                
                <ol className="ps-lg-5">
                    { tipoRespuesta === "opcion_multiple" && exercise.respuestas && exercise.respuestas.map(
                        (respuesta, index) => (
                            <li className="py-lg-3" key={index}> <InlineMath math={respuesta} /> </li>
                        ))
                    }
                </ol>

                <div className="card-footer bg-transparent d-flex justify-content-end">
                    <button className="btn btn-danger me-2" onClick={() => deleteExercise(exercise.enunciado, gIndex)}>
                        {svgIcon.delete}
                        Eliminar
                    </button>
                    { solutionType !== "oculta" && (
                        <button className="btn btn-info" data-bs-toggle="collapse" data-bs-target={`#solution${index}`}>
                            {svgIcon.watch}
                            Ver solucion
                        </button>
                    )}
                </div>
                { solutionType !== "oculta" && ( 
                    <CardSolution exercise={exercise} id={index} number={number} solutionType={solutionType} /> 
                )}
            </div>
        </div>
    );
};

export default CardExercise
