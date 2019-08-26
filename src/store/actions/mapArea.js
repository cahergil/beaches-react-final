// @flow
import * as actionsTypes from './actionTypes';

type SetMapAreaAction = {
  type: typeof actionsTypes.SET_MAP_AREA,
  payload: string
};

export type Action = SetMapAreaAction;

export const setMapArea = (regionId: string): SetMapAreaAction => {
  
  return {
    type: actionsTypes.SET_MAP_AREA,
    payload: regionId
  }
}