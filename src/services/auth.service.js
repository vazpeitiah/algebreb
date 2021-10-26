const authService = {}

const API_URL = 'http://localhost:4000'

authService.signin = async (user) => {
	const configuration = {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	}

	const res = await fetch(API_URL + '/auth/signin', configuration)
	const data = await res.json()

	if (data.success === true) {
		localStorage.setItem('user', JSON.stringify(data.user))
	}

	return data
}

authService.signup = async (user) => {
	const configuration = {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user)
	}

	const res = await fetch(API_URL + '/auth/signup', configuration)
	const data = await res.json()

	if (data.success === true) {
		localStorage.setItem('user', JSON.stringify(data.user))
	}

	return data
}

authService.logout = () => {
	localStorage.removeItem("user")
}

// Agregar encabaezado para poder realizar peticiones a la api
authService.authHeader = async () => {
	const user = JSON.parse(localStorage.getItem('user'))

	if (user && user.token) {
		return { 'x-access-token': user.token };
	} else {
		return {};
	}
}

authService.getCurrentUser = () => {
	return JSON.parse(localStorage.getItem('user'))
}

authService.verifyToken = async (user) => {
	const configuration = {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token: user.token })
	}

	const request = await fetch(API_URL + '/auth/verify', configuration);
	const requestJson = await request.json();

	return requestJson.success
}

export default authService