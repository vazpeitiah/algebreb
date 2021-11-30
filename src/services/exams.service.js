import authService from "./auth.service"

const examsService = {}

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://algebreb-api.herokuapp.com'

examsService.getExamsStudent = async (userId) => {
  const configuration = {
		headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
	}

  const res = await fetch(`${API_URL}/exams/bystudent/${userId}`, configuration)
  const resJson = await res.json()

  return resJson
}

examsService.getKardex = async (student, group) => {
  const configuration = {
		headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
    method: "POST",
    body: JSON.stringify({student, group})
	}

  const res = await fetch(`${API_URL}/exams/kardex`, configuration)
  const resJson = await res.json()

  return resJson
}

examsService.getExams = async (userId) => {
  const configuration = {
		headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
	}

  const res = await fetch(`${API_URL}/groups/byuser/${userId}`, configuration)
  const groups = await res.json()

  let exams = []
  for(let i = 0; i < groups.length; i++) {
    const aux = await examsService.getExamsByGroup(groups[i]._id)
    exams = [...exams, ...aux]
  }

  return exams
}

examsService.getExamsByGroup = async (groupId) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
    }
  
    const res = await fetch(`${API_URL}/exams/bygroup/${groupId}`, configuration)
    const resJson = await res.json()
    
    if(resJson && resJson.success) {
      return resJson.exams
    } else {
      return []
    }
    
  } catch (err) {
    return []
  }
}

examsService.deleteExam = async (examId) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      method: "DELETE"
    }
  
    const res = await fetch(`${API_URL}/exams/${examId}`, configuration)
    const resJson = await res.json()
    
    return resJson
  } catch (err) {
    return {success:false, message: err.message}
  }
}

examsService.updateExam = async (examId, params) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      method: "PUT",
      body: JSON.stringify(params)
    }
  
    const res = await fetch(`${API_URL}/exams/${examId}`, configuration)
    const resJson = await res.json()
    
    return resJson
  } catch (err) {
    return {success:false, message: err.message}
  }
}

examsService.createExam = async (params) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(params)
    }
  
    const res = await fetch(`${API_URL}/exams`, configuration)
    const resJson = await res.json()
    
    return resJson
  } catch (err) {
    return {success:false, message: err.message}
  }
}

examsService.getExam = async (examId) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' }
    }
    const res = await fetch(`${API_URL}/exams/${examId}`, configuration)
    const resJson = await res.json()
    
    return resJson
  } catch (err) {
    return {success:false, message: err.message}
  }
}

examsService.submitExam = async (examId, params) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(params)
    }
    const res = await fetch(`${API_URL}/exams/submit/${examId}`, configuration)
    const data = await res.json()
    return data
  } catch (err) {
    return {success:false, message: err.message}
  }
}

examsService.getExamData = async (examId) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
    }
    const res = await fetch(`${API_URL}/exams/data/${examId}`, configuration)
    const data = await res.json()
    return data
  } catch (err) {
    return {success:false, message: err.message}
  }
}

examsService.getExamsTeacher = async (examId) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
    }
    const res = await fetch(`${API_URL}/exams/teacher/${examId}`, configuration)
    const data = await res.json()
    return data
  } catch (err) {
    return {success:false, message: err.message}
  }
}




export default examsService