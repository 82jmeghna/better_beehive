import { combineReducers } from 'redux'
import authReducer from './authReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  authReducer,
  routing: routerReducer,
}) 

export default rootReducer 
