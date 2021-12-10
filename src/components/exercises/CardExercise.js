import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import svgIcon from "../../lib/svgIcons";
import CardSolution from "./CardSolution";

const CardExercise = ({ exercise, index, number, solutionType, numberExercises }) => {
    const numberClass = "col-md-" + numberExercises + " p-2";
    return (
        <div className={numberClass}>
            <div
            key={index}
            className="card m-2 pt-2"
            >
            {exercise.enunciado && (
                <div className="card-header d-flex justify-content-between">
                <h6 className="pt-2">
                    <b>{number})</b> <InlineMath math={exercise.enunciado} />
                </h6>
                </div>
            )}
            <div className="card-footer bg-transparent d-flex justify-content-end">
                <button
                className="btn btn-info"
                data-bs-toggle="collapse"
                data-bs-target={`#solution${index}`}
                >
                {svgIcon.watch}
                Ver solucion
                </button>
            </div>
            <CardSolution exercise={exercise} id={index} number={number} solutionType={solutionType} />
            </div>
        </div>
    );
};

export default CardExercise
