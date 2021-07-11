import { combineReducers } from 'redux'
import TodoReducer from './TodoSlice'

const rootReducer = combineReducers({
  TodoReducer,
})

export default rootReducer
