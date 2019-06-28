import * as actions from '../actions/actionTypes'

const initialState = {
  select: 'termino_municipal',
  input: '',
  return: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_MAP_RESULTS_SELECT: 
      // console.log(action.payload);
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