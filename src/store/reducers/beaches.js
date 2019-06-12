import * as actionTypes from '../actions/actionTypes';
const initialState = {
  beaches: [],
  error: false
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case actionTypes.SET_COUNTRY_BEACHES_START:
      return {
        ...state,
        error: false
      }

    case actionTypes.SET_COUNTRY_BEACHES_SUCCEED:
      return {
        ...state,
        beaches: [...action.payload],
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