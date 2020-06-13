/* global localStorage */
import axios from 'axios'
import ReactOnRails from 'react-on-rails'
import {
  UNAUTHORIZED, GETTING_DATA, GETTING_DONE, PATCHING, PATCHED, PATCH_FAILED,
  POSTING, POST_SUCCEED, POST_FAILED, DELETED, DELETE_FAILED
} from '../constants/serverConstants'
import { reset } from 'redux-form'

axios.defaults.headers.common['X-CSRF-Token'] = ReactOnRails.authenticityToken()
axios.defaults.headers.post['Content-Type'] = 'application/json'

export function gettingData (type) {
  return {
    type: GETTING_DATA
  }
}

export function gettingCompleted (type) {
  return {
    type: GETTING_DONE
  }
}

export function getCompleted (type, data) {
  return {
    type: type,
    result: data
  }
}

export function requestFailed (status, data) {
  return {
    type: UNAUTHORIZED,
    result: data.error
  }
}

export const makeRequest = (path, params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(gettingData())
    axios.get('/api' + path).then(response => {
      dispatch(getCompleted(params.type, response.data))
      dispatch(gettingCompleted())
      resolve(response.data)
    }).catch(error => {
      if (error.response) {
        if (error && error.response && error.response.status === 401) {
          window.location.href = '/users/sign_in'
          dispatch(requestFailed(error.response.status, error && error.response && error.response.data))
        } else {
          dispatch(getCompleted(params.type, error && error.response && error.response.data))
        }
        reject(error)
      }
    })
  })

export const clearReduxState = (stateVariable) => {
  return dispatch => {
    dispatch((() => ({
      type: 'CLEAR_REDUX_STATE',
      result: stateVariable
    }))())
  }
}
export function posting (type) {
  return {
    type: type
  }
}

export function posted (type, data) {
  return {
    type: type,
    result: data
  }
}

export function postFailed (type, data) {
  return {
    type: type,
    result: data
  }
}

export function getFailed (type, data) {
  return {
    type: type,
    result: data
  }
}

export const postRequest = (path, params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    console.log(params, path, 'postRequest params')
    dispatch(posting(POSTING))
    axios.post(path, params.values).then(response => {
      dispatch(posted(params.type || POST_SUCCEED, response.data))
      if (params.values && params.values.formName) dispatch(reset(params.values.formName))
      return resolve(response.data)
    }).catch(error => {
      if (error.response) {
        if (error && error.response && error.response.status === 401) {
          window.location.href = '/users/sign_in'
          dispatch(requestFailed(error.response.status, error && error.response && error.response.data))
        } else {
          dispatch(postFailed(POST_FAILED, error && error.response && error.response.data))
        }
        return reject(error)
      }
    })
  })

export function patching (type) {
  return {
    type: type
  }
}

export function patched (type, data) {
  return {
    type: type,
    result: data
  }
}

export function patchFailed (type, data) {
  return {
    type: type,
    result: data
  }
}

export const patchRequest = (path, params) => (dispatch) =>
  new Promise(function (resolve, reject) {
    dispatch(patching(PATCHING))
    axios.patch(path, params).then((response) => {
      dispatch(patched(PATCHED, response.data))
      dispatch(reset(params.formName))
      resolve(response.data)
    }).catch((error) => {
      if (error && error.response && error.response.status === 401) {
        window.location.href = '/users/sign_in'
        dispatch(requestFailed(error.response.status, error && error.response && error.response.data))
      } else {
        dispatch(patchFailed(PATCH_FAILED, error && error.response && error.response.data))
      }
      reject(error)
    })
  })

export function deleted (data) {
  return {
    type: DELETED,
    result: data
  }
}

export function deleteFailed (data) {
  return {
    type: DELETE_FAILED,
    result: data
  }
}

export const deleteRequest = (path) => {
  return (dispatch) => {
    axios.delete(path).then((response) => {
      return dispatch(deleted(response.data))
    })
      .catch((error) => {
        dispatch(deleteFailed(error && error.response && error.response.data))
      })
  }
}

export const phoneValidator = (path, params) => {
  return (dispatch) => {
    dispatch(gettingData())
    axios.post(path, params.values).then((response) => {
      dispatch(getCompleted(params.type, response.data))
    }).catch((error) => {
      if (error && error.response && error.response.status === 401) {
        window.location.href = '/users/sign_in'
        dispatch(requestFailed(error.response.status, error && error.response && error.response.data))
      } else {
        dispatch(patchFailed(PATCH_FAILED, error && error.response && error.response.data))
      }
    })
  }
}
