import axios from 'axios'

const API_URL = '/api/goals'

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const config = {
    headers: {
      Authorization: `Bearer ${ user ? user.token : null }`
  }
}

const getGoals = async () => {
  const response = await axios.get(API_URL +'/', config)
  
  return response.data
}

const createGoal = async (goalData) => {
  const response = await axios.post(API_URL +'/', goalData, config)

  return response.data
}

const updateGoal = async (id, text) => {
  const response = await axios.put(API_URL +'/'+ id, text, config)

  return response.data
}

const deleteGoal = async (id) => {
  const response = await axios.delete(API_URL +`/${ id }`, config)

  return response.data
}

const goalService = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
}

export default goalService
