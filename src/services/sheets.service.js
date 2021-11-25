import authService from "./auth.service"

const sheetService = {}

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://algebreb-api.herokuapp.com'

sheetService.getSheetsByUser = async (userId) => {
  try{
    const res = await fetch(API_URL + '/sheets/byuser/' + userId, {
      headers: {...authService.authHeader(), "Content-Type": "application/json"}
    })
    const data = await res.json()
    return data
  } catch(err) {
    return {message: err.message}
  }
}

sheetService.getSheetById = async (sheetId) => {
  try{
    const res = await fetch(API_URL + '/sheets/' + sheetId, {
      headers: {...authService.authHeader(), "Content-Type": "application/json"},
    })
    const data = await res.json()
    return data
  } catch(err) {
    return {message: err.message}
  }
}

sheetService.createSheet = async (params) => {
  try{
    const res = await fetch(API_URL + '/sheets', {
      method: "POST",
      headers: {...authService.authHeader(), "Content-Type": "application/json"},
      body: JSON.stringify(params)
    })
    const data = await res.json()
    return data
  } catch(err) {
    return {message: err.message}
  }
}


sheetService.updateSheet = async (sheetId, params) => {
  try{
    const res = await fetch(API_URL + '/sheets/' + sheetId, {
      method: "PUT",
      headers: {...authService.authHeader(), "Content-Type": "application/json"},
      body: JSON.stringify(params)
    })
    const data = await res.json()
    return data
  } catch(err) {
    return {message: err.message}
  }
}

sheetService.deleteSheet = async (sheetId) => {
  try{
    const res = await fetch(API_URL + '/sheets/' + sheetId, {
      method: "DELETE",
      headers: {...authService.authHeader(), "Content-Type": "application/json"}
    })
    const data = await res.json()
    return data
  } catch(err) {
    return {message: err.message}
  }
}

export default sheetService