import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers/index'
// import thunk from 'redux-thunk'

const configureStore = (railsProps) => (
  createStore(reducer, railsProps, applyMiddleware(thunk))
)

export default configureStore
