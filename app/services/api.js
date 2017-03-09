import { create } from 'apisauce'

let istance = null;
const create = (baseURL = 'http://localhost:3000/api', token) => {
  if (instance !== null) {
    return instance;
  }

  const headers = {
    'Cache-Control': 'no-cache'
  };

  if (token !== null) {
    headers['Authorization'] = `Bearer ${token}`
  };

  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 10000
  });

  api.login = (user, password) => api.post('/login', {email, password});
  api.register = (user, password, email) => api.post('/register', {email, email, password});
}