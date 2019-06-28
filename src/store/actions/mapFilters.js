import * as actions from './actionTypes'


export const setMapResultsSelect = (value) => {
  return {
    type: actions.SET_MAP_RESULTS_SELECT,
    payload: value
  }
}

export const setMapResultsInput = (value) => {
  return {
    type: actions.SET_MAP_RESULTS_INPUT,
    payload: value
  }
}

export const setReturnFromDetails = (value) => {
  return {
    type: actions.SET_RETURN_FROM_DETAILS,
    payload: value
  }
}
