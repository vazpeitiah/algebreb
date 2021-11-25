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
		<div className='container mt-4 p-4'>
			<div className='row align-items-center'>
				<div className='col'>
					<h2>Tabla de hojas</h2>
				</div>
				<div className='col text-end'>
					<button className={showForm ? "btn btn-secondary" : "btn btn-success"}
						onClick={() => setShowForm(!showForm)}>
						{showForm ? "Ocultar" : "Agregar hoja"}
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
								<Link to={`/sheet/${sheet._id}`} className="btn btn-primary">
									Editar
								</Link>
							</td>
							<td>
								<button className="btn btn-danger"
									onClick={() => deleteSheet(sheet._id)}>
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
