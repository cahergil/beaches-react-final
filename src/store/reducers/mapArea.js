import * as actions from '../actions/actionTypes';

const initialState = {
  regionId: ''
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actions.SET_MAP_AREA:
      // console.log('set_map_are reducer:', action.payload)
      return {
        ...state,
        regionId: action.payload
      }
    default: return state;
  }

}

export default reducer;