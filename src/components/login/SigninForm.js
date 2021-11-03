import { useState } from 'react'

const SigninForm = ({ onLogin, isLoading }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()
		const newUser = { username, password }
		onLogin(newUser)
		setPassword('')
	}

	return (
		<form onSubmit={onSubmit}>
			<label className="form-label">Nombre de usuario o email:</label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
				<input type="text"
					className="form-control"
					placeholder="Nombre de usuario o email"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required />
			</div>

			<label className="form-label">Contraseña:</label>
			<div className="input-group mb-3">
				<span className="input-group-text"><i className="bi bi-key-fill"></i></span>
				<input type="password"
					className="form-control"
					placeholder="Contraseña del usuario"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required />
			</div>
			<input type="submit" 
				className="btn btn-primary form-control mb-2" 
				value="Iniciar sesión" 
				disabled={isLoading} />
		</form>
	)
}

export default SigninForm
