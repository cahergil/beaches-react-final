import * as actionTypes from './actionTypes';
import axios from 'axios';
// import jsonFile from '../../assets/files/playas.json' not working
// set json file in public directory
export const setCountryBeachesStart = () => {
  return {
    type: actionTypes.SET_COUNTRY_BEACHES_START
  }
}


export const setCountryBeachesSucceed = (beachesList) => {
  
  return {
    type: actionTypes.SET_COUNTRY_BEACHES_SUCCEED,
    payload: beachesList
  }
}


export const setCountryBeachesFailed = (error) => {
  return {
    type: actionTypes.SET_COUNTRY_BEACHES_FAILED,
    payload: error
  }
}

export const setCountryBeaches = () => {
  return dispatch => {
    dispatch(setCountryBeachesStart());
    axios.get('./playas.json')
      .then(response => {
        // console.log(response)
        dispatch(setCountryBeachesSucceed(response.data))
      }
    ).catch(err => {
        dispatch(setCountryBeachesFailed())
        console.log('error accesing the file',err)
      })


    }

}

export const setRegionBeaches =(regionList) => {
  return {
    type: actionTypes.SET_REGION_BEACHES,
    payload: regionList
  }
}