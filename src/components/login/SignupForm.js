import { useState } from 'react'
import './login.css'

const SignupForm = ({ onSignup, isLoading }) => {

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
			<label htmlFor="email" className="form-label">Correo electrónico: </label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
				<input
					type="email"
					className="form-control"
					placeholder="Correo electrónico"
					name="email"
					required
					value={email}
					onChange={setEmail} />
			</div>
			<label htmlFor="name" className="form-label">Nombre completo:</label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-person-lines-fill"></i></span>
				<input
					type="text"
					className="form-control"
					placeholder="Nombre y apellidos"
					name="name"
					required
					value={name}
					onChange={setName} />
			</div>
			<label htmlFor="username" className="form-label">Nombre de usuario:</label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-person-fill"></i></span>
				<input
					type="text"
					className="form-control"
					placeholder="Username"
					name="username"
					required
					value={username}
					onChange={setUsername} />
			</div>
			<label htmlFor="password" className="form-label">Contraseña: </label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-key-fill"></i></span>
				<input
					type="password"
					className="form-control"
					placeholder="Contraseña"
					name="password"
					required
					value={password}
					onChange={setPassword} />
			</div>
			<label htmlFor="passwordConfirm" className="form-label">Confirmar contreaseña: </label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-key-fill"></i></span>
				<input
					type="password"
					className="form-control"
					placeholder="Confirmar la contraseña"
					name="passwordConfirm"
					required
					value={passwordConfirm}
					onChange={setPasswordConfirm} />
			</div>
			<label htmlFor="role" className="form-label">Tipo de usuario:</label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-people-fill"></i></span>
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
			<button type="submit"
				className="form-control btn btn-primary bg-btn mb-2"
				disabled={isLoading}>Registrarse</button>
		</form>
	)
}

export default SignupForm
