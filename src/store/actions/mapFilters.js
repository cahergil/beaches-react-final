
// @flow
import * as actionsTypes from './actionTypes'
// import type { batch } from 'react-redux';

type SetMapResultsSelectAction = {
  type: typeof actionsTypes.SET_MAP_RESULTS_SELECT,
  payload: string
};
type SetMapResultsInputAction = {
  type: typeof actionsTypes.SET_MAP_RESULTS_INPUT,
  payload: string
};
export type SetReturnFromDetailsAction = {
  type: typeof actionsTypes.SET_RETURN_FROM_DETAILS,
  payload: boolean
};
type SetMapAreaAction = {
  type: typeof actionsTypes.SET_MAP_AREA,
  payload: string
};


export type Action =
  | SetMapResultsSelectAction
  | SetMapResultsInputAction
  | SetReturnFromDetailsAction
  | SetMapAreaAction;

export const setMapResultsSelect = (value: string): SetMapResultsSelectAction => {
  return {
    type: actionsTypes.SET_MAP_RESULTS_SELECT,
    payload: value
  }
}

export const setMapResultsInput = (value: string): SetMapResultsInputAction => {
  return {
    type: actionsTypes.SET_MAP_RESULTS_INPUT,
    payload: value
  }
}

export const setReturnFromDetails = (value: boolean): SetReturnFromDetailsAction  => {
  return {
    type: actionsTypes.SET_RETURN_FROM_DETAILS,
    payload: value
  };
};

export const setMapArea = (regionId: string): SetMapAreaAction => {
  return {
    type: actionsTypes.SET_MAP_AREA,
    payload: regionId
  };
};

// type PromiseAction = Promise<Action>;
// // eslint-disable-next-line no-use-before-define
// type ThunkAction = (dispatch: Dispatch) => any;
// type Dispatch = (
//   action: Action | ThunkAction | PromiseAction | Array<Action>
// ) => any;

// export const onClickMapThunk = (fromDetails: boolean, regionId: string): ThunkAction => { 
//   return (dispatch) => {
//     dispatch(setReturnFromDetails(fromDetails));
//     dispatch(setMapArea(regionId))
//   }
// }