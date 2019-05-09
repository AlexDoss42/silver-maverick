const initialState = {
  user_id: null,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  facebook: '',
  instagram: '',
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
    const { firstname, lastname, email, phone, facebook, instagram, profilePic} = payload
      return { ...state, firstname, lastname, email, phone, facebook, instagram, profilePic }
    
    default: 
      return state
  }
}