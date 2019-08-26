// @flow
import * as actionsTypes from './actionTypes'

type SetMapResultsSelectAction = {
  type: typeof actionsTypes.SET_MAP_RESULTS_SELECT,
  payload: string
};
type SetMapResultsInputAction = {
  type: typeof actionsTypes.SET_MAP_RESULTS_INPUT,
  payload: string
};
type SetReturnFromDetailsAction = {
  type: typeof actionsTypes.SET_RETURN_FROM_DETAILS,
  payload: boolean
};

export type Action =
  | SetMapResultsSelectAction
  | SetMapResultsInputAction
  | SetReturnFromDetailsAction;

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
