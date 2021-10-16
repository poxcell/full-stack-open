import axios from 'axios'
const baseUrl = '/api/login'


const logIn = (username,password) => {
  const request = axios({
    method:'post',
    url:baseUrl,
    data:{
      username:username,
      password:password
    }
  })
  return request.then(response => response.data)
}

export default { logIn }