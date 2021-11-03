import { forwardRef } from 'react'
import Solutions from './Solutions';
import Exercise from './Exercise';

const Exercises = forwardRef(({ exercises, title, tipoSolucion }, ref) => {

	return (
		<div ref={ref} style={{ margin: "0", padding: "0" }} >
			<h2>{title}</h2>
			{tipoSolucion !== "solo_respuestas" && (
				<>
					{exercises.length !== 0 ? exercises.map((ex, idx) => (
						<div className="row" key={idx}>
							<h5>{ex.instrucciones}</h5>
							{ex.exercisesArr.map((exercise, index) => (
								<Exercise exercise={exercise} key={index} index={index + 1} tipoRespuesta={ex.tipoRespuesta} />
							))}
							{ex.exercisesArr.length === 0 && (<p> No se han agregado ejercicios</p>)}
						</div>
					)) : (<p>No se han agregado ejercicios aún</p>)}
				</>
			)}


			{tipoSolucion !== "oculta" && (
				<Solutions exercises={exercises} tipoSolucion={tipoSolucion} />
			)}

		</div>
	)
})

export default Exercises
