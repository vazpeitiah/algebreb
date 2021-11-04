import { useState, useEffect, useRef } from 'react'
import Exercises from '../exercises/Exercises'
import ExercisesForm from '../exercises/ExercisesForm'
import Topics from './Topics'
import { useParams, useHistory } from 'react-router-dom'
import exercisesService from '../../services/exercises.service'
import sheetService from '../../services/sheets.service'
import './sheets.css'
import { useReactToPrint } from 'react-to-print';
import helpers from '../../lib/helpers'

const SheetPage = () => {
	const [exercises, setExercises] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [topic, setTopic] = useState('suma_polinomios')
	const [currentSheet, setCurrentSheet] = useState(undefined)
	const [showSolution, setShowSolution] = useState(false)
	const [solutionsType, setSolutionsType] = useState('oculta')
	// react-router-dom
	const { sheetId } = useParams()
	let history = useHistory()
	// react-to-print
	const componentRef = useRef();

	useEffect(() => {
		const getCurrentSheet = async () => {
			const sheet = await sheetService.getSheetById(sheetId)
			if (sheet) {
				setCurrentSheet(sheet)
				setExercises(sheet.exercises)
				setSolutionsType(sheet.solutionsType)
			}
		}
		getCurrentSheet()
	}, [sheetId])

	const genExercises = async (params) => {
		setIsLoading(true)
		const res = await exercisesService.getExercises(topic, params)
		if (res.latex) {
			const exercisesLatex = res.latex
			const newExercises = {
				instrucciones: res.instrucciones,
				exercisesArr: exercisesLatex,
				tipoRespuesta: params.tipoRespuesta
			}
			setExercises([...exercises, newExercises])
		} else {
			alert("ERROR: " + res.message)
		}
		setIsLoading(false)
	}

	const selectTopic = (currentTopic) => {
		setTopic(currentTopic)
	}

	const clearSheet = async () => {
		setCurrentSheet({ ...currentSheet, exercises: [] })
		setExercises([])
	}

	const saveSheet = async () => {
		if (currentSheet && currentSheet.description !== '') {
			const updatedSheet = await sheetService.updateSheet(currentSheet._id, {
				description: currentSheet.description,
				type: currentSheet.type,
				exercises: exercises,
				solutionsType
			})

			if (updatedSheet && updatedSheet._id) {
				setCurrentSheet(updatedSheet)
				alert("Se actulizó la hoja correctamente")
			} else {
				alert('ERROR: No se actulizó la hoja')
			}
		} else {
			alert('Debes colocarle un nombre a la hoja')
		}

	}

	const handleDownloadPDF = () => {
		setShowSolution(!showSolution)
		downloadPDF()
	}

	const downloadPDF = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: currentSheet && currentSheet.description,
		pageStyle: helpers.getPrintConfig
	});

	return (
		<div className="container-fluid" >
			<div className='row align-items-center border rounded  p-1'>
				<div className='col-lg-3'>
					<input type="text"
						name="description"
						id="description"
						value={currentSheet ? currentSheet.description : ""}
						className="form-control-plaintext h3"
						onChange={(e) => setCurrentSheet({ ...currentSheet, description: e.target.value })}
						autoComplete='off'
						placeholder='Nombre de la hoja' />
				</div>
				<div className='col text-end'>
					<button className='btn btn-primary me-1' onClick={saveSheet}>Guardar</button>
					<button className='btn btn-secondary ms-1' onClick={history.goBack}>Regresar</button>
				</div>
			</div>
			<div className="row mt-2">
				<div className="col-lg-2">
					<h5>Agregar ejercicios</h5>
					<Topics selectTopic={selectTopic} /> 
					<ExercisesForm genExercises={genExercises} topic={topic} isLoading={isLoading} selectTopic={selectTopic} />
					<h5>Configurar Hoja</h5>
					<label htmlFor="type">Tipo de hoja:</label>
					<select id="type"
						className="form-select"
						value={currentSheet ? currentSheet.type : "lista_ejercicios"}
						onChange={(e) => setCurrentSheet({ ...currentSheet, type: e.target.value })}>
						<option value="lista_ejercicios">Lista de ejercicios</option>
						<option value="examen">Examen</option>
						<option value="tarea">Tarea</option>
					</select>
					<label htmlFor="solutionsType">Tipo de solución</label>
					<select id="solutionsType"
						className='form-select'
						value={solutionsType}
						onChange={(e) => setSolutionsType(e.target.value)}>
							<option value="oculta">No mostar soluciones</option>
							<option value="unica">Solución final</option>
							<option value="pasos">Soluciones paso a paso</option>
							<option value="solo_respuestas">Mostrar solo las respuestas</option>
					</select>
					<button className="btn btn-danger form-control mt-2 mb-2"
						onClick={clearSheet}
						id="clear"
						disabled={!isLoading ? "" : "disable"} >
						Vaciar hoja
					</button>
					<h5>Exportar hoja</h5>
					<label htmlFor="format">Seleccione un formato</label>
					<select className='form-select'>
						<option value="pdf">PDF</option>
					</select>
					<button className='btn btn-primary form-control mt-2 mb-2' onClick={handleDownloadPDF}>Exportar</button>
				</div>
				<div className='col border rounded m-2' style={{ overflowX: 'auto'}}>
					{!isLoading ? (
						<Exercises exercises={exercises}
							ref={componentRef}
							title={currentSheet && currentSheet.description}
							solutionsType={solutionsType} />) :
						(<center className="mt-4">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<p>Cargando...</p>
						</center>)
					}
				</div>
			</div>
		</div>
	)
}

export default SheetPage
