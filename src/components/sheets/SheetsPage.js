import { useState, useEffect } from 'react'
import sheetService from '../../services/sheets.service'
import SheetForm from './SheetForm'
import { Link } from 'react-router-dom'
import helpers from '../../lib/helpers'

function SheetsPage({ user }) {
	const [sheets, setSheets] = useState([])
	const [showForm, setShowForm] = useState(false)

	useEffect(() => {
		const getSheets = async () => {
			const res = await sheetService.getSheetsByUser(user.id)
			setSheets(res)
		}
		getSheets()
	}, [user])

	const deleteSheet = async (sheetId) => {
		const yes = window.confirm("¿Realmente quieres eliminar la hoja?")
		if (yes) {
			await sheetService.deleteSheet(sheetId)
			setSheets(sheets.filter(sheet => sheet._id !== sheetId))
		}
	}

	const addSheet = async (params) => {
		const newSheet = await sheetService.createSheet({ ...params, user: user.id })
		setSheets([...sheets, newSheet])
	}

	return (
		<div className='container mt-4 p-4 animate__animated animate__fadeInUp'>
			<div className='row align-items-center'>
				<div className='col'>
					<h2>Tabla de hojas</h2>
				</div>
				<div className='col text-end'>
					<button className={showForm ? "btn btn-secondary" : "btn btn-success"}
						onClick={() => setShowForm(!showForm)}>
						{showForm ? <>
						<svg 
							xmlns="http://www.w3.org/2000/svg" 
							width="16" 
							height="16" 
							fill="currentColor" 
							className="bi bi-x-square-fill me-2" 
							viewBox="0 0 16 16">
  							<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
						</svg> 
						Cancelar
						</> : <>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-plus-square-fill me-2"
							viewBox="0 0 16 16"
							>
							<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
						</svg>
						Agregar hoja</>}
					</button>
				</div>
			</div>
			{showForm && (<SheetForm addSheet={addSheet} user={user} />)}
			<div className="table-responsive">
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>#</th>
							<th>Descripción</th>
							<th>Última modificación</th>
							<th>Tipo</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{sheets.map((sheet, index) =>
						(<tr key={index} className="overlay">
							<td>{index + 1}</td>
							<td>{sheet.description}</td>
							<td>{helpers.timeago(sheet.date)}</td>
							<td>
								{sheet.type === "examen" && "Examen"}
								{sheet.type === "lista_ejercicios" && "Lista de ejercicios"}
								{sheet.type === "tarea" && "Tarea"}
							</td>
							<td>
								<Link to={`/sheet/${sheet._id}`} className="btn btn-primary col-lg-12">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-pencil-fill me-2"
										viewBox="0 0 16 16"
										>
										<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
									</svg>
									Editar
								</Link>
							</td>
							<td>
								<button className="btn btn-danger col-lg-11"
									onClick={() => deleteSheet(sheet._id)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-trash-fill me-2"
										viewBox="0 0 16 16">
										<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
									</svg>
									Eliminar
								</button>
							</td>
						</tr>)
						)}
					</tbody>
					{sheets.length === 0 && (<caption>No se han encontrado hojas</caption>)}
				</table>
			</div>
		</div>
	)
}

export default SheetsPage
