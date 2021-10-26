import { useState } from 'react'

const SigninForm = ({ onLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()

		const newUser = { username, password }

		onLogin(newUser)

		/* setUsername('')*/
		setPassword('') 
	}

	return (
		<form onSubmit={onSubmit}>

			<div className="mb-3">
				<label className="form-label">Nombre de usuario</label>
				<input type="text"
					className="form-control"
					placeholder="Email o usuario"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required />
			</div>

			<div className="mb-3">
				<label className="form-label">Contraseña</label>
				<input type="password"
					className="form-control"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required />
			</div>
			<button type="submit" className="btn btn-primary">Iniciar sesión</button>
		</form>
	)
}

export default SigninForm
