import authService from "./auth.service"

const groupsService = {}

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://algebreb-api.herokuapp.com'

groupsService.addGroup = async (params) => {
  const configuration = {
    method: "POST",
		headers: { ...authService.authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(params)
	}

  const res = await fetch(`${API_URL}/groups`, configuration)
  const newGroup = await res.json()

  return newGroup
}

groupsService.getGroupsByUser = async (userId) => {
  const configuration = {
		headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
	}

  const res = await fetch(`${API_URL}/groups/${userId}`, configuration)
  const groups = await res.json()

  return groups
}

groupsService.deleteGroup = async (groupId) => {
  const configuration = {
    method: "DELETE",
		headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
	}

  const res = await fetch(`${API_URL}/groups/${groupId}`, configuration)
  const deletedGroup = await res.json()

  return deletedGroup
}

export default groupsService