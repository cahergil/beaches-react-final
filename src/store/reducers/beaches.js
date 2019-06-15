import * as actionTypes from '../actions/actionTypes';
const initialState = {
  beachesList: [],
  regionBeachesList: [],
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
      console.log('inside set beaches success');
      return {
        ...state,
        beachesList: [...action.payload],
        // beaches: action.payload,
        error: false
      }
    case actionTypes.SET_COUNTRY_BEACHES_FAILED:
      return {
        ...state,
        error: true
      }
    case actionTypes.SET_REGION_BEACHES:
      return {
        ...state,
        regionBeachesList: [...action.payload],
        
      }
    default:
      return state;
  }


}

export default reducer;