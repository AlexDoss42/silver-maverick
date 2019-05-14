import { createStore, combineReducers } from 'redux'
import accReducer from './reducers/accountReducer'
import tripReducer from './reducers/tripReducer'

const rootReducer = combineReducers({
  account: accReducer,
  trip: tripReducer
})

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())