import authService from "./auth.service"
import exercisesService from "./exercises.service"
import groupsService from "./groups.service"
import sheetService from "./sheets.service"

const examsService = {}

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://algebreb-api.herokuapp.com'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/escom-ipn/image/upload'

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
  const data = await groupsService.getGroupsByTeacher(userId)
  
  let groups = []
  if(data && data.success) {
    groups = data.groups
  }

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
    const data = await res.json()

    if(data && data.success && params.different) {
      const exams = data.examsForm
      for (let i = 0; i < exams.length; i++) {
        let exercises = []
        for (let j = 0; j < params.exparams.length; j++) { 
          const response = await exercisesService.getExercises(params.exparams[j].topic, params.exparams[j])
          if (response.latex) {
            const exercisesLatex = response.latex
            const newExercises = {
              instrucciones: response.instrucciones,
              exercisesArr: exercisesLatex,
              tipoRespuesta: params.exparams[j].tipoRespuesta
            }
            exercises.push(newExercises)
          } 
        }
        const body = {
          description: params.sheet_description,
          type: params.type,
          user: params.teacher,
          exercises: exercises,
          params: params.exparams
        }

        const res = await sheetService.createSheet(body)
        if(res && res.success) {
          await examsService.updateSheet(exams[i], {sheet: res.sheet._id})
        }
      }
    }
    
    return data
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

examsService.updateExamApply = async (examId, params) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      method: "PUT",
      body: JSON.stringify(params)
    }
    const res = await fetch(`${API_URL}/exams/data/${examId}`, configuration)
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

examsService.uploadImages = async (examId, images) => {
  try {
    const url_images = []
    for (let i = 0; i < images.length; i++) {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: images[i]
      })

      const response = await res.json() 
      url_images.push(response.url)
    }

    const params = {
      images: url_images
    }

    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      method: "POST"
    }

    const res = await fetch(`${API_URL}/exams/uploadIMG/${examId}`, configuration)
    const data = await res.json()
    return data
  } catch (err) {
    return {success:false, message: err.message}
  }
}

examsService.updateSheet = async (examId, params) => {
  try {
    const configuration = {
      headers: { ...authService.authHeader(), 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(params)
    }
    const res = await fetch(`${API_URL}/exams/updatesheet/${examId}`, configuration)
    const data = await res.json()
    return data
  } catch (err) {
    return {success:false, message: err.message}
  }
}

export default examsService