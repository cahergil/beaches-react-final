// @flow
import * as actionsTypes from './actionTypes'


export type SetNudismAction = { 
  type: typeof actionsTypes.SET_NUDISM, 
  payload: boolean
  }
export type SetBlueFlagAction = {
  type: typeof actionsTypes.SET_BLUE_FLAG,
  payload: boolean
};
export type SetSurfingAreaAction = {
  type: typeof actionsTypes.SET_SURFING_AREA,
  payload: boolean
};
export type SetBeachBarAction = {
  type: typeof actionsTypes.SET_BEACH_BAR,
  payload: boolean
};
export type SetNauticsRentalAction = {
  type: typeof actionsTypes.SET_NAUTICS_RENTAL,
  payload: boolean
};
export type SetDivingAreaAction = {
  type: typeof actionsTypes.SET_DIVING_AREA,
  payload: boolean
};
export type SetDisabledPersonsAction = {
  type: typeof actionsTypes.SET_DISABLED_PERSONS,
  payload: boolean
};
export type SetOccupancyAction = {
  type: typeof actionsTypes.SET_OCCUPANCY,
  payload: string
};
export type SetPromenadeAction = {
  type: typeof actionsTypes.SET_PROMENADE,
  payload: boolean
};
export type SetHospitalDistanceAction = {
  type: typeof actionsTypes.SET_HOSPITAL_DISTANCE,
  payload: number
};
export type SetBeachLengthAction = {
  type: typeof actionsTypes.SET_BEACH_LENGTH,
  payload: number
};
export type SetSearchTextAction = {
  type: typeof actionsTypes.SET_SEARCH_TEXT,
  payload: string
};
export type SetUmbrellaBeachRentalAction = {
  type: typeof actionsTypes.SET_UMBRELLA_BEACH_RENTAL,
  payload: boolean
};
export type SetSunbedRentalAction = {
  type: typeof actionsTypes.SET_SUNBED_RENTAL,
  payload: boolean
};
export type SetSelectTextAction = {
  type: typeof actionsTypes.SET_SELECT_TEXT,
  payload: string
};
export type SetResetAction = { type: typeof actionsTypes.SET_RESET };

export type Action = 
| SetNudismAction 
| SetBlueFlagAction
| SetSurfingAreaAction
| SetBeachBarAction
| SetNauticsRentalAction
| SetDivingAreaAction
| SetDisabledPersonsAction
| SetOccupancyAction
| SetPromenadeAction
| SetHospitalDistanceAction
| SetBeachLengthAction
| SetSearchTextAction
| SetUmbrellaBeachRentalAction
| SetSunbedRentalAction
| SetSelectTextAction
| SetResetAction





export const setNudism = (value: boolean): SetNudismAction => {
  return {
    type: actionsTypes.SET_NUDISM,
    payload: value
  }
}
export const setBlueFlag = (value: boolean): SetBlueFlagAction => {
  return {
    type: actionsTypes.SET_BLUE_FLAG,
    payload: value
  }
}
export const setSurfingArea = (value: boolean): SetSurfingAreaAction => {
  return {
    type: actionsTypes.SET_SURFING_AREA,
    payload: value
  }
}
export const setBeachBar = (value:boolean): SetBeachBarAction => {
  return {
    type: actionsTypes.SET_BEACH_BAR,
    payload: value
  }
}
export const setNauticsRental = (value: boolean): SetNauticsRentalAction => {
         return {
           type: actionsTypes.SET_NAUTICS_RENTAL,
           payload: value
         };
       };
export const setDivingArea = (value:boolean): SetDivingAreaAction => {
  return {
    type: actionsTypes.SET_DIVING_AREA,
    payload: value
  }
}
export const setDisabledPersons = (value:boolean): SetDisabledPersonsAction => {
  return {
    type: actionsTypes.SET_DISABLED_PERSONS,
    payload: value
  }
}
export const setOccupancy = (value: string): SetOccupancyAction => {
         return {
           type: actionsTypes.SET_OCCUPANCY,
           payload: value
         };
       };
export const setPromenade = (value: boolean): SetPromenadeAction => {
  return {
    type: actionsTypes.SET_PROMENADE,
    payload: value
  }
}
export const setHospitalDistance = (value: number): SetHospitalDistanceAction => {
         return {
           type: actionsTypes.SET_HOSPITAL_DISTANCE,
           payload: value
         };
       };
export const setBeachLength = (value: number): SetBeachLengthAction => {
         return {
           type: actionsTypes.SET_BEACH_LENGTH,
           payload: value
         };
       };
export const setSearchText = (value: string): SetSearchTextAction => {
         return {
           type: actionsTypes.SET_SEARCH_TEXT,
           payload: value
         };
       };

export const setUmbrellaBeachRental = (value: boolean):SetUmbrellaBeachRentalAction => {
         return {
           type: actionsTypes.SET_UMBRELLA_BEACH_RENTAL,
           payload: value
         };
       };

export const setSunbedRental = (value: boolean): SetSunbedRentalAction => {
         return {
           type: actionsTypes.SET_SUNBED_RENTAL,
           payload: value
         };
       };

export const setSelectText = (value: string): SetSelectTextAction => {
         return {
           type: actionsTypes.SET_SELECT_TEXT,
           payload: value
         };
       };

export const setReset = (): SetResetAction => {
         return {
           type: actionsTypes.SET_RESET
         };
       };

