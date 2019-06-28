import * as actionsTypes from './actionTypes';

export const setMapArea = (regionId) => {
  
  return {
    type: actionsTypes.SET_MAP_AREA,
    payload: regionId
  }
}