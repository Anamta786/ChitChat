import {
  GETTING_DATA, GETTING_DONE, UNAUTHORIZED, DELETED, DELETE_FAILED, PATCH_FAILED, PATCHED, POSTING,
  POST_SUCCEED, POST_FAILED, PATCHING
} from '../constants/serverConstants'

const initialState = {}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GETTING_DATA:
      return {
        ...state,
        gettingData: true,
        gotData: false,
        loaded: false
      }
    case GETTING_DONE:
      return {
        ...state,
        gettingData: false,
        gotData: true,
        loaded: true
      }
    case UNAUTHORIZED:
      return { message: 'Your session has been expired', currentUser: null }
      // Post Request
    case POSTING:
      return { ...state, posting: true }
    case POST_SUCCEED:
      return { ...state, posting: false, message: action && action.result && action.result.message }
    case POST_FAILED:
      return {
        ...state,
        posting: false,
        message: action && action.result && action.result.message,
        error: action.result.error
      }
      // delete request
    case DELETED:
      return {
        ...state,
        result: action.result,
        message: action && action.result && action.result.message
      }
    case DELETE_FAILED:
      return { ...state, message: action && action.result && action.result.message }
      // patch/update request
    case PATCHING:
      return { ...state, patching: true }
    case PATCHED:
      return {
        ...state,
        patching: false,
        result: action.result,
        message: action && action.result && action.result.message
      }
    case PATCH_FAILED:
      return { ...state, patching: false, message: action && action.result && action.result.statusText }
  }
}
