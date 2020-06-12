import { createStore } from 'redux'
import reducer from '../reducers/index'

const configureStore = (railsProps) => (
  createStore(reducer, railsProps)
)

export default configureStore
