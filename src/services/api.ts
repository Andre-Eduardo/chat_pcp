import axios from 'axios'

const api = axios.create({
  baseURL: '',

  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  },
})

export default api
