// @flow
import * as actions from '../actions/actionTypes';
import type { Action } from '../actions/searchFilters';

export type State = {
  nudism: boolean,
  blueFlag: boolean,
  surfingArea: boolean,
  beachBar: boolean,
  nauticsRental: boolean,
  divingArea: boolean,
  sunbedRental: boolean,
  beachUmbrellaRental: boolean,
  disabledPersons: boolean,
  occupancy: string,
  promenade: boolean,
  hospitalDistance: number,
  beachLength: number,
  selectText: string,
  searchText: string
};
const initialState: State = {
  nudism: false,
  blueFlag: false,
  surfingArea: false,
  beachBar: false,
  nauticsRental: false,
  divingArea: false,
  sunbedRental: false,
  beachUmbrellaRental: false,
  disabledPersons: false,
  occupancy: 'All',
  promenade: false,
  hospitalDistance: 120,
  beachLength: 28000,
  selectText: 'termino_municipal',
  searchText: ''
  
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case actions.SET_NUDISM:
      return {
        ...state,
        nudism: action.payload
      }
    case actions.SET_BLUE_FLAG:
      return {
        ...state,
        blueFlag: action.payload
      }
    case actions.SET_SURFING_AREA:
      return {
        ...state,
        surfingArea: action.payload
      }
    case actions.SET_BEACH_BAR:
      return {
        ...state,
        beachBar: action.payload
      }
    case actions.SET_NAUTICS_RENTAL:
      return {
        ...state,
        nauticsRental: action.payload
      }
    case actions.SET_DIVING_AREA:
      return {
        ...state,
        divingArea: action.payload
      }
    case actions.SET_SUNBED_RENTAL:
      return {
        ...state,
        sunbedRental: action.payload
      }
    case actions.SET_UMBRELLA_BEACH_RENTAL:
      return {
        ...state,
        beachUmbrellaRental: action.payload
      }
    case actions.SET_DISABLED_PERSONS:
      return {
        ...state,
        disabledPersons: action.payload
      }
    case actions.SET_OCCUPANCY:
      return {
        ...state,
        occupancy: action.payload
      }
    case actions.SET_PROMENADE:
      return {
        ...state,
        promenade: action.payload
      }
    case actions.SET_HOSPITAL_DISTANCE:
      return {
        ...state,
        hospitalDistance: action.payload
      }
    case actions.SET_BEACH_LENGTH:
      return {
        ...state,
        beachLength: action.payload
      }
    case actions.SET_SELECT_TEXT:
      return {
        ...state,
        selectText: action.payload
      }
    case actions.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      }
    case actions.SET_RESET:
      return {
        ...state,
        nudism: false,
        blueFlag: false,
        surfingArea: false,
        beachBar: false,
        nauticsRental: false,
        divingArea: false,
        sunbedRental: false,
        beachUmbrellaRental: false,
        disabledPersons: false,
        occupancy: 'All',
        promenade: false,
        hospitalDistance: 120,
        beachLength: 28000,
        selectText: 'termino_municipal',
        searchText: ''
      }
    default: return state;
  }

}

export default reducer;