const initialState = {
  user_id: null,
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
  venmo: '',
  profilePic: '',
  authenticated: false
}

const UPDATE_USER_ID = "UPDATE_USER_ID"
const UPDATE_EMAIL = "UPDATE_EMAIL"
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS"


export function updateUserId(id) {
  return {
    type: UPDATE_USER_ID,
    payload: id
  }
}

export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    payload: email
  }
}

export function updateUserDetails(obj) {
  return {
    type: UPDATE_USER_DETAILS,
    payload: obj
  }
}

export default function reducer(state = initialState, action){
  const { type, payload } = action
  switch(type){
    case UPDATE_USER_ID: 
      return { ...state, user_id: payload }

    case UPDATE_EMAIL:
      return { ...state, email: payload }

    case UPDATE_USER_DETAILS:
    const { user_id, email, firstname, lastname, username, phone, venmo, profilePic, authenticated} = payload
      return { ...state, user_id, email, firstname, username, lastname, phone, venmo, profilePic, authenticated }
    
    default: 
      return state
  }
}