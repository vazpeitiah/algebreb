const authService = {}

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://algebreb-api.herokuapp.com'

authService.signin = async (params) => {
	try {
		const configuration = {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		}
	
		const res = await fetch(API_URL + '/auth/signin', configuration)
		const data = await res.json()
	
		if (data.success === true) {
			localStorage.setItem('user', JSON.stringify(data.user))
		}
	
		return data
	} catch (err) {
		return { success: false, message:err.message }
	}
}

authService.signup = async (params) => {
	try {
		const configuration = {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		}
	
		const res = await fetch(API_URL + '/auth/signup', configuration)
		const data = await res.json()
	
		if (data.success === true) {
			localStorage.setItem('user', JSON.stringify(data.user))
		}
	
		return data
	} catch (err) {
		return { success: false, message: err.message }
	}
}

authService.logout = () => {
	localStorage.removeItem("user")
}

authService.getCurrentUser = () => {
	const currentUser = JSON.parse(localStorage.getItem('user'));
	if(currentUser && new Date(currentUser.expiresIn) >= new Date()) {
		return currentUser
	}else {
		return null
	}	 
}

// Agregar encabaezado para poder realizar peticiones a la api
authService.authHeader = () => {
	const user = authService.getCurrentUser()

	if (user && user.token) {
		return { 'x-access-token': user.token };
	} else {
		return {};
	}
}

authService.verifyToken = async (user) => {
	try {
		const configuration = {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: user.token })
		}
	
		const request = await fetch(API_URL + '/auth/verify', configuration);
		const data = await request.json();
	
		return data.success
	} catch (err) {
		return { success: false, message: err.message }
	}
}

authService.updateProfile = async (params) => {
	try{
		const configuration = {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		}
	
		const res = await fetch(API_URL + '/auth/profile', configuration)
		const data = await res.json()

		if(data && data.user) {
			const currentUser = authService.getCurrentUser()
			console.log('current user: ', currentUser)
			authService.logout()
			localStorage.setItem('user', JSON.stringify({...currentUser, ...data.user}))
			console.log('new user: ', {...currentUser, ...data.user})
		}
		return data
	} catch (err) {
		return { success: false, message: err.message }
	}
}

export default authService