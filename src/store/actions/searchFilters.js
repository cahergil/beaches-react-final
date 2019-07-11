import * as actions from './actionTypes'

export const setNudism = value => {
  return {
    type: actions.SET_NUDISM,
    payload: value
  }
}
export const setBlueFlag = value => {
  return {
    type: actions.SET_BLUE_FLAG,
    payload: value
  }
}
export const setSurfingArea = value => {
  return {
    type: actions.SET_SURFING_AREA,
    payload: value
  }
}
export const setBeachBar = value => {
  return {
    type: actions.SET_BEACH_BAR,
    payload: value
  }
}
export const setNauticsRental = value => {
  return {
    type: actions.SET_NAUTICS_RENTAL,
    payload: value
  }
}
export const setDivingArea = value => {
  return {
    type: actions.SET_DIVING_AREA,
    payload: value
  }
}
export const setDisabledPersons = value => {
  return {
    type: actions.SET_DISABLED_PERSONS,
    payload: value
  }
}
export const setOcuppancy = value => {
  return {
    type: actions.SET_OCCUPANCY,
    payload: value
  }
}
export const setPromenade = value => {
  return {
    type: actions.SET_PROMENADE,
    payload: value
  }
}
export const setHospitalDistance = value => {
  return {
    type: actions.SET_HOSPITAL_DISTANCE,
    payload: value
  }
}
export const setBeachLength = value => {
  return {
    type: actions.SET_BEACH_LENGTH,
    payload: value
  }
}
export const setSearchText = value => {
  return {
    type: actions.SET_SEARCH_TEXT,
    payload: value
  }
}

export const setUmbrellaBeachRental = value => {
  return {
    type: actions.SET_UMBRELLA_BEACH_RENTAL,
    payload: value
  }
}

export const setSunbedRental = value => {
  return {
    type: actions.SET_SUNBED_RENTAL,
    payload: value
  }
}

export const setSelectText = value => {
  return {
    type: actions.SET_SELECT_TEXT,
    payload: value
  }
}

export const setReset = value => {
  return {
    type: actions.SET_RESET
    
  }
}