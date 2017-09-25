import { IS_AUTHENTICATED, INVALID_USER, IS_ALREADY_AUTHENTICATED, REMOVE_TOKEN } from '../actions/actionTypes'
import initialState from './initialState' 
import _ from 'lodash'

export default function authReducer(state = initialState.authReducer,action) {
  switch(action.type) {
  case IS_AUTHENTICATED:
    let isAuthenticated = _.cloneDeep({ isAuthenticated:true, jwt:action.data.jwt, user: action.data.user })
    return Object.assign({},state,isAuthenticated)
  case IS_ALREADY_AUTHENTICATED:
    let isAuthenticatedData = _.cloneDeep({ isAuthenticated:true, jwt:action.data.jwt })
    return Object.assign({},state,isAuthenticatedData)
  case INVALID_USER:
    return Object.assign({},state, { invalidUser:true })
  case REMOVE_TOKEN:
    return Object.assign({},state, { jwt:'' })
  default:
    return state
  }
}
