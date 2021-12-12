const exercisesService = {}

const API_URL = 'http://localhost:5000/'

exercisesService.getExercises = async (topic, params) => {
  try {
    const res = await fetch(API_URL + topic, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    })
    const data = await res.json()
    return JSON.parse(data)
  } catch (err) {
    return {message: err.message}
  }
}

export default exercisesService