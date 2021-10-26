import { useState } from 'react'
import { Link } from 'react-router-dom'
//import  from '../utils/CustomHooks'

const SignupForm = ({ onSignup }) => {

	const useInput = (initValue) => {
		const [value, setValue] = useState(initValue)
		const handleChange = (e) => setValue(e.target.value)
		return [value, handleChange]
	}

	const [email, setEmail] = useInput('')
	const [name, setName] = useInput('')
	const [username, setUsername] = useInput('')
	const [password, setPassword] = useInput('')
	const [passwordConfirm, setPasswordConfirm] = useInput('')
	const [role, setRole] = useState('alumno')

	const onSubmit = (e) => {
		e.preventDefault()

		const newUser = { 
			email,
			name,
			username,
			password,
			passwordConfirm,
			roles: [role] 
		}

		onSignup(newUser)
	}
	
	return (
		<form onSubmit={onSubmit}>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">Correo electrónico</label>
				<input
					type="email"
					className="form-control"
					placeholder="Correo electrónico"
					name="email"
					required
					value={email}
					onChange={setEmail} />
			</div>
			<div className="mb-3">
				<label htmlFor="name" className="form-label">Nombre de usuario</label>
				<input
					type="text"
					className="form-control"
					placeholder="Nombre del usuario"
					name="name"
					required
					value={name}
					onChange={setName} />
			</div>
			<div className="mb-3">
				<label htmlFor="username" className="form-label">Username o nickname</label>
				<input
					type="text"
					className="form-control"
					placeholder="username"
					name="username"
					required
					value={username}
					onChange={setUsername} />
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">Contraseña</label>
				<input
					type="password"
					className="form-control"
					placeholder="Contraseña"
					name="password"
					required
					value={password}
					onChange={setPassword} />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="passwordConfirm" className="form-label">Confirmar contreaseña</label>
				<input
					type="password"
					className="form-control"
					placeholder="Confirme su contraseña"
					name="passwordConfirm"
					required
					value={passwordConfirm}
					onChange={setPasswordConfirm} />
			</div>

			<div className="mb-3">
				<label htmlFor="role" className="form-label">Tipo de usuario</label>
				<select name="role"
					id="role"
					className='form-select'
					required
					value={role}
					onChange={(e) => setRole(e.target.value)}>
					<option value="alumno">Alumno</option>
					<option value="profesor">Profesor</option>
				</select>
			</div>

			<div className="form-group mb-3">
				<Link to='/signin'>¿Ya tienes una cuenta?</Link>
			</div>

			<button type="submit" className="btn btn-primary">Registrarse</button>
		</form>
	)
}

export default SignupForm
