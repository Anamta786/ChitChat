import { START_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGGING_OUT, LOGOUT_SUCCESS } from '../constants/authConstants'

const initialState = {}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case START_LOGIN:
      return { loggingIn: true, loggedIn: false }
    case LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true
      }
    case LOGIN_FAIL:
      return { loggingIn: false, loggedIn: false, message: action.result }
    case LOGGING_OUT:
      return state
    case LOGOUT_SUCCESS:
      return {
        loggingIn: false,
        loggingOut: false,
        loggedIn: false,
        currentUser: false,
        message: 'Signed out successfully'
      }
  }
}
