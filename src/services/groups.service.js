import authService from "./auth.service"

const groupsService = {}

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://algebreb-api.herokuapp.com'

groupsService.createGroup = async (params) => {
  try {
    const configuration = {
      method: "POST",
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    }
  
    const res = await fetch(`${API_URL}/groups`, configuration)
    const data = await res.json()
  
    return data
  } catch (err) {
    return { success: false, message: err.message }
  }
}

groupsService.getGroupsByTeacher = async (teacherId) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
    }
  
    const res = await fetch(`${API_URL}/groups/byteacher/${teacherId}`, configuration)
    const data = await res.json()
  
    return data
  } catch (err) {
    return { success: false, message: err.message }
  }
}

groupsService.getGroupsByStudent = async (stundetId) => {
  const configuration = {
		headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
	}

  const res = await fetch(`${API_URL}/groups/bystudent/${stundetId}`, configuration)
  const response = await res.json()
  return response
}

groupsService.getGroupById = async (groupId) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
    }
  
    const res = await fetch(`${API_URL}/groups/${groupId}`, configuration)
    const data = await res.json()
  
    return data
  } catch (err) {
    return { success:false, message: err.message }
  }
}

groupsService.updateGroup = async (groupId, params) => {
  try {
    const configuration = {
      method: "PUT",
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }
  
    const res = await fetch(`${API_URL}/groups/${groupId}`, configuration)
    const data = await res.json()
  
    return data
  } catch (err) {
    return { success: false, message: err.message }
  }
}

groupsService.deleteGroup = async (groupId) => {
  try {
    const configuration = {
      method: "DELETE",
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
    }
  
    const res = await fetch(`${API_URL}/groups/${groupId}`, configuration)
    const data = await res.json()
  
    return data
  } catch (err) {
    return { success: false, message: err.message }
  }
}

groupsService.enrollStudent = async (groupId, student) => {
  try {
    const configuration = {
      method: "POST",
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({groupId, student})
    }
  
    const res = await fetch(`${API_URL}/groups/enroll`, configuration)
    const data = await res.json()
  
    return data
  } catch (err) {
    return { success: false, message: err.message }
  }
}

export default groupsService