// @flow
import * as actions from '../actions/actionTypes'
import type { Action } from '../actions/mapFilters';
export type State = {
  select: string,
  input: string,
  return: boolean
}

const initialState: State = {
  select: 'termino_municipal',
  input: '',
  return: false
}

const reducer = (state: State = initialState, action: Action) => {
  switch(action.type) {
    case actions.SET_MAP_RESULTS_SELECT: 
      return {
        ...state,
        select: action.payload,
        input: ''
      }
    case actions.SET_MAP_RESULTS_INPUT:
      return {
        ...state,
        input: action.payload
      }
    case actions.SET_RETURN_FROM_DETAILS:
      return {
        ...state,
        return: action.payload
      }
    default: return state;
  }
};


export default reducer;