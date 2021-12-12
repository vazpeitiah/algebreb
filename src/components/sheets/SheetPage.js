import { useState, useEffect, useRef } from 'react'
import Exercises from '../exercises/Exercises'
import ExercisesForm from '../exercises/ExercisesForm'
import Topics from './Topics'
import { useParams, useHistory } from 'react-router-dom'
import exercisesService from '../../services/exercises.service'
import sheetService from '../../services/sheets.service'
import { useReactToPrint } from 'react-to-print';
import helpers from '../../lib/helpers'
import ApplyExam from './ApplyExam'
import examsService from '../../services/exams.service'
import authService from "../../services/auth.service";
import { exportComponentAsJPEG } from 'react-component-export-image';
import svgIcon from '../../lib/svgIcons'
import './sheets.css'
import '../profile/profile.css'

const SheetPage = ({user}) => {
	const [exercises, setExercises] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [topic, setTopic] = useState('suma_polinomios')
	const [currentSheet, setCurrentSheet] = useState(undefined)
	const [showSolution, setShowSolution] = useState(false)
	const [solutionsType, setSolutionsType] = useState('oculta')
	const [numberExercises, setNumberExercises] = useState('6')
	const [viewCard, setviewCard] = useState(null)
	const [params, setParams] = useState([]) 
	// react-router-dom
	const { sheetId } = useParams()
	let history = useHistory()
	// react-to-print
	const componentRef = useRef();

	useEffect(() => {
		const getCurrentSheet = async () => {
			const res = await sheetService.getSheetById(sheetId)
			if (res && res.success) {
				setCurrentSheet(res.sheet)
				setExercises(res.sheet.exercises)
				setSolutionsType(res.sheet.solutionsType)
				setParams(res.sheet.params)
			} else {
				window.alert(`Error: ${res.message}`)
			}
		}
		getCurrentSheet()
	}, [sheetId])

	const genExercises = async (parameters) => {
		setIsLoading(true)
		const res = await exercisesService.getExercises(topic, parameters)
		if (res.latex) {
			const exercisesLatex = res.latex
			const newExercises = {
				instrucciones: res.instrucciones,
				exercisesArr: exercisesLatex,
				tipoRespuesta: parameters.tipoRespuesta
			}
			setExercises([...exercises, newExercises])
			setParams([...params, {...parameters, topic, solutionsType}])
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
		setCurrentSheet({ ...currentSheet, params: [] })
		setParams([])
	}

	const saveSheet = async () => {
		if (currentSheet && currentSheet.description !== '') {
			const res = await sheetService.updateSheet(currentSheet._id, {
				description: currentSheet.description,
				type: currentSheet.type,
				exercises: exercises,
				solutionsType,
				params
			})

			if (res && res.success) {
				setCurrentSheet(res.sheet)
				alert("Se actulizó la hoja correctamente")
			} else {
				window.alert(`Error: ${res.message}`)
			}
		} else {
			alert('Debes colocarle un nombre a la hoja')
		}

	}

	const handleDownload = () => {
		const exportType = document.getElementById("export-type").value;
		switch (exportType) {
			case "pdf":
				setShowSolution(!showSolution);
				
				if(viewCard) setviewCard(!viewCard)

				downloadPDF();
				break;

			case "latex":
				downloadLatex();
				break;

			case "png":
				downloadPNG();
				break;
			
			default:
				break;
		}
	}

	const downloadPDF = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: currentSheet && currentSheet.description,
		pageStyle: helpers.getPrintConfig
	})

	const downloadLatex = () => {
		let doc = helpers.createLatexDocument(exercises, currentSheet.description, authService.getCurrentUser().name);

		doc = doc.replace(/,/g, '');

		var blob = new Blob([doc, " ", 2], {
			type: "text/plain;charset=utf-8",
		}).slice(2, -1);
		var url = URL.createObjectURL(blob);
		var elem = document.createElement("a");
		elem.href = url;
		elem.download = currentSheet.description + ".tex";
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	};

  	const downloadPNG = () =>  exportComponentAsJPEG(componentRef);

	const applyExam = async (parameters) => {
		const confirm = window.confirm('¿Quieres aplicar una evaluación con la hoja actual?')
		if(confirm) {
			setIsLoading(true)
			parameters = {
				...parameters, 
				sheet: sheetId, 
				type: currentSheet.type, 
				exparams:params,
				teacher: user.id,
				sheet_description: currentSheet.description}
			const response = await examsService.createExam(parameters)
			setIsLoading(false)
			if(response && response.success) {
				window.alert('El examen se ha generado. Puede revisar la pestaña de evaluaciones')
			}else {
				window.alert('Error: '+ response.message)
			}
		}
	}

	const deleteExercise = (enunciado, gIndex) => {
		let newExercises = [...exercises]
		let newParams = [...params]

		newExercises = newExercises.map(exercise => {
		  exercise.exercisesArr = exercise.exercisesArr.filter(ex => ex.enunciado !== enunciado)
		  return exercise
		})

		newParams = newParams.map((param, idx) => {
			if(idx === gIndex) param.cantidad -= 1;
			return param
		})

		setExercises(newExercises)
		setParams(newParams)
	}

	return (
		<div className="container-fluid">
			<div className='row pt-3'>
                <div className='col-4'>
                    <div className='row'>
                        <div className="col-lg-3">
                            <label className='h3' htmlFor="description">Nombre:</label>
                        </div>
                        <div className="col-lg">
                            <input type="text"
                                name="description"
                                id="description"
                                value={currentSheet ? currentSheet.description : ""}
                                className="form-control h3"
                                onChange={(e) => setCurrentSheet({ ...currentSheet, description: e.target.value })}
                                autoComplete='off'
                                placeholder='Nombre de la hoja' />
                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <div className='row ms-4'>
						<div className='col d-grid gap-2 d-md-flex justify-content-md-end'>
							<div className='col-auto py-auto me-lg-5'>
								<div className="form-check form-switch pt-2">
									<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
											onChange={ (e) => {setviewCard(e.target.checked)} } />
									<label className="form-check-label" htmlFor="flexSwitchCheckDefault">Vista de cartas</label>
								</div>
							</div>
							<div className='btn-toolbar col-auto me-lg-5'>
								<div className='col-auto pt-2 me-2'>
									<label className="form-check-label">Número de ejercicios: </label>
								</div>
								<div className='col-auto'>
									<select id='exercise-number' className="form-select form-control" value={numberExercises}  onChange={ e => { setNumberExercises(e.target.value) }}>
										<option value="12">1</option>
										<option value="6">2</option>
										<option value="4">3</option>
									</select>
								</div>
							</div>
							<button className='btn btn-primary me-1 ms-1' onClick={saveSheet}>
								{svgIcon.save}
								Guardar
							</button>
							<button className='btn btn-secondary ms-1' onClick={history.goBack}>
								{svgIcon.back}
								Regresar
							</button>
						</div>
                    </div>
				</div>
			</div>
			<div className="row mt-2">
				<div className="col-lg-2 mb-2">
					<div className='card border-info mb-3'>
						<div className='card-header border-info text-center'>
							<h5>Agregar ejercicios</h5>
						</div>
						<div className='card-body'>							
							<Topics selectTopic={selectTopic} /> 
							<ExercisesForm genExercises={genExercises} topic={topic} isLoading={isLoading} selectTopic={selectTopic} />
						</div>
					</div>
					<div className='card border-info my-3'>
						<div className='card-header border-info text-center'>
							<h5>Configurar Hoja</h5>
						</div>
						<div className='card-body'>
							<label htmlFor="type">Tipo de hoja:</label>
							<select id="type"
								className="form-select"
								value={currentSheet ? currentSheet.type : "lista_ejercicios"}
								onChange={(e) => setCurrentSheet({ ...currentSheet, type: e.target.value })}>
								<option value="lista_ejercicios">Lista de ejercicios</option>
								{user && user.roles.includes('profesor') && (
									<>
										<option value="examen">Examen</option>
										<option value="tarea">Tarea</option>
									</>
								)}
							</select>
							<label htmlFor="solutionsType">Tipo de solución</label>
							<select id="solutionsType"
								className='form-select'
								value={solutionsType}
								onChange={(e) => setSolutionsType(e.target.value)}>
									<option value="oculta">No mostar soluciones</option>
									<option value="unica">Solución final</option>
									<option value="pasos">Soluciones paso a paso</option>
									<option value="solo_respuestas" disabled={!viewCard ? "" : "disable"} >
										Mostrar solo las respuestas
									</option>
							</select>
							<button className="btn btn-danger form-control mt-2 mb-2"
								onClick={clearSheet}
								id="clear"
								disabled={!isLoading ? "" : "disable"} >
								{svgIcon.delete}
								Vaciar hoja
							</button>
						</div>
					</div>
                    <div className='card border-info my-3'>
						<div className='card-header border-info text-center'>
							<h5>Exportar hoja</h5>
						</div>
                        <div className='card-body border-info'>
							<label htmlFor="format">Seleccione un formato</label>
							<select id="export-type" className='form-select'>
								<option value="pdf">PDF</option>
								<option value="latex">LATEX</option>
								<option value="png">Imagen</option>
							</select>
							<button className='btn btn-primary form-control mt-2 mb-2' onClick={handleDownload}>
								{svgIcon.download}
								Exportar
							</button>
						</div>
                    </div>
                    {currentSheet && (currentSheet.type === "examen" || currentSheet.type === "tarea") && (
                        <ApplyExam user={user} applyExam={applyExam} />
                        )}
                </div>
                <div className='col border border-dark py-2 mb-2 me-2' style={{ overflowX: 'auto'}}>
                    {!isLoading ? (
                        <Exercises 
							exercises={exercises}
                            ref={componentRef}
                            title={currentSheet && currentSheet.description}
                            solutionsType={solutionsType}
							numberExercises={numberExercises}
							viewType={viewCard}
							deleteExercise={deleteExercise} />) :
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
