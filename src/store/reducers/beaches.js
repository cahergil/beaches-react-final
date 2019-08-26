// @flow
import * as actionTypes from '../actions/actionTypes';
// Cannot import the type `[type]` as a value. Use `import type` instead
// https://github.com/facebook/flow/issues/6590
import type {Action} from '../actions/beaches';
import type { Beach } from './../../components/Model/Beach';

export type State = {
  beachesList: Array<Beach>,
  error: boolean
}
const initialState: State = {
  beachesList: [],
  error: false
};

const reducer = (state: State = initialState, action: Action): State => {
  
  switch (action.type) {
    case actionTypes.SET_COUNTRY_BEACHES_START:
      return {
        ...state,
        error: false
      }

    case actionTypes.SET_COUNTRY_BEACHES_SUCCEED:
      return {
        ...state,
        beachesList: [...action.payload],
        error: false
      }
    case actionTypes.SET_COUNTRY_BEACHES_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }


}

export default reducer;