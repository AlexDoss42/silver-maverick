const initialState = {
  trip_id: null,
  group_leader: true,
  name: '',
  user_id: null
}

const UPDATE_NAME = "UPDATE_NAME"
const SET_REDUX_STATE = "SET_REDUX_STATE"

export function updateName(name) {
  return {
    type: UPDATE_NAME,
    payload: name
  }
}

export function setReduxState(obj) {
  return {
    type: UPDATE_NAME,
    payload: obj
  }
}

export default function reducer(state = initialState, action){
  const { type, payload } = action
  switch(type){
    case UPDATE_NAME: 
      return { ...state, name: payload }

    case SET_REDUX_STATE:
    const { trip_id, group_leader, name, user_id } = payload
      return {...state, trip_id, group_leader, name, user_id }
    
    default: 
      return state
  }
}