import history from '../history.js'
import { IS_AUTHENTICATED, INVALID_USER, IS_ALREADY_AUTHENTICATED, REMOVE_TOKEN } from './actionTypes'

export const loginUser = (credentials) => {
  return (dispatch) => {
    if (credentials.Email.trim() !== '' || credentials.Password.trim() !== '') {
      fetch('auth/authenticate', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          token: {
            email: credentials.Email,
            password: credentials.Password,
          },
        }),
      })
      .then((req) => {
        return req.json()
      })
        .then(data =>{
          if(data.Token && data.error === false){
            localStorage.setItem('jwt', data.Token)
            dispatch({ type:IS_AUTHENTICATED,data:{ jwt:data.Token, user:data.User } })
            history.push('/home')
          }
          else {
            dispatch({ type:INVALID_USER })
            history.push('/')
          }
        })
      .catch(error => {
        console.error('failure', error)
      })
    } else {
      dispatch({ type:INVALID_USER })
      history.push('/')
    }
  }
}

export const setAuthenticated = (token) => {
  return(dispatch) => {
    dispatch({ type:IS_ALREADY_AUTHENTICATED, data:{ jwt:token } })
  }
} 

export const removeToken = () => {
  return(dispatch) => {
    localStorage.removeItem('jwt')
    dispatch({ type:REMOVE_TOKEN })
    history.push('/')
  }
}

