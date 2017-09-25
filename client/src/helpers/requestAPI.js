import history from '../history'
const BASE_URL = 'http://localhost:3000'

export const makeAPICall = ({ url, method = 'GET', header = {}, data = {} }) => {

  const headers = Object.assign(header, {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwt'),
  })

  const params = { method, headers }

  if (method === 'POST' || method === 'PUT') params.body = JSON.stringify(data)

  fetch(`${BASE_URL}/${url}`, params)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return response.json()
        } else {
          return response.statusText
        }
      })
      .then((data) => {
        if(data === 'Unauthorized' || data === 'Forbidden'){
          localStorage.removeItem('jwt')
          history.push('/')
        }
        else {
          return data
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
}



