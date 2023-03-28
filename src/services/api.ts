import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apiportaldecompras.dubbox.com.br',
})
// headers: {
//   'Content-Type': 'application/json',
//   // 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
// },

export default api
