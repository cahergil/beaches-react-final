// @flow
import * as actions from '../actions/actionTypes';
import type {Action} from '../actions/mapArea';
export type State = {
  regionId: string
}
export const initialState:State = {
  regionId: ''
}

const reducer = (state:State = initialState, action: Action) => {

  switch (action.type) {
    case actions.SET_MAP_AREA:
      return {
        ...state,
        regionId: action.payload
      }
    default: return state;
  }

}

export default reducer;