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

export const setCountryBeaches = (route) => {
  return dispatch => {
    dispatch(setCountryBeachesStart());
    // axios.get('./playas.json')
    let finalRoute;
    if (process.env.NODE_ENV === 'production') {
      finalRoute = '../' + route;
    } else {
      finalRoute = route
    }
    axios.get(finalRoute)
      .then(response => {
          // console.log(response.data)
        // const tempArray = response.data;
        
        // const resultsArray = [];
        // tempArray.forEach(element => {
        //   if (element.images) {
        //     const images = element.images.split(',');
        //     if (images.length > 8) {
        //       resultsArray.push({nombre: element.nombre, ca: element.comunidad_autonoma, length: images.length})
        //     }
        //   } else {
        //     console.log('noimages', element);
        //   }
          
        // });
        // console.log(resultsArray);
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