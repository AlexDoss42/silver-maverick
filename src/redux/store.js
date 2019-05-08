import { createStore, combineReducers } from 'redux'
import accReducer from './reducers/accountReducer'

const rootReducer = combineReducers({
  account: accReducer
})

export default createStore(rootReducer)