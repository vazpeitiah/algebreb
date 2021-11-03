import authService from "./auth.service"

const sheetService = {}

const API_URL = 'http://localhost:5000/sheets'

sheetService.getSheetsByUser = async (userId) => {
  try{
    const res = await fetch(API_URL + '/byuser/' + userId, {
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
    const res = await fetch(API_URL + '/' + sheetId, {
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
    const res = await fetch(API_URL, {
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
    const res = await fetch(API_URL + '/' + sheetId, {
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
    const res = await fetch(API_URL + '/' + sheetId, {
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