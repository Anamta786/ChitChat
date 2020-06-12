import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { name } from './islioReducer'

export default combineReducers({
  name,
  form
})
