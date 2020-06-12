import { START_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/authConstants'
import axios from 'axios'
import ReactOnRails from 'react-on-rails'
axios.defaults.headers.common['X-CSRF-Token'] = ReactOnRails.authenticityToken()
axios.defaults.headers.post['Content-Type'] = 'application/json'

export function userIsLogging () {
  return {
    type: START_LOGIN
  }
}

export function userLogInSuccess (data) {
  return {
    type: LOGIN_SUCCESS,
    result: data
  }
}

export function userLogInFailed (data) {
  return {
    type: LOGIN_FAIL,
    result: data.error
  }
}

export const logInUser = (formParams) => {
  console.log('yessss', formParams)
  return (dispatch) => {
    dispatch(userIsLogging())
    return axios
      .post('/api/users/sign_in', formParams)
      .then((response) => {
        axios.defaults.headers.common['X-CSRF-Token'] =
          response.headers['x-csrf-token']
        dispatch(userLogInSuccess(response.data))
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.statusText === 'Unprocessable Entity'
        ) {
          window.location.href = '/users/sign_in'
        } else {
          dispatch(
            userLogInFailed(error && error.response && error.response.data)
          )
        }
      })
  }
}
