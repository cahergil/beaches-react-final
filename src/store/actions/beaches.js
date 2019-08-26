// @flow
import * as actionTypes from './actionTypes';
import axios from 'axios';
import type {Beach}  from './../../components/Model/Beach';
// import jsonFile from '../../assets/files/playas.json' not working
// set json file in public directory

type SetCountryBeachesStartAction = {
  type: typeof actionTypes.SET_COUNTRY_BEACHES_START
}
type setCountryBeachesSucceedAction = {
  type: typeof actionTypes.SET_COUNTRY_BEACHES_SUCCEED,
  payload: Array<Beach>
};
type setCountryBeachesFailedAction = {
  type: typeof actionTypes.SET_COUNTRY_BEACHES_FAILED,
  payload: string
};

export type Action =
         | SetCountryBeachesStartAction
         | setCountryBeachesSucceedAction
         | setCountryBeachesFailedAction;


export const setCountryBeachesStart = (): SetCountryBeachesStartAction => {
  return {
    type: actionTypes.SET_COUNTRY_BEACHES_START
  };
};


export const setCountryBeachesSucceed = (
         beachesList: Array<Beach>
       ): setCountryBeachesSucceedAction => {
         return {
           type: actionTypes.SET_COUNTRY_BEACHES_SUCCEED,
           payload: beachesList
         };
       };


export const setCountryBeachesFailed = (
         error: string
       ): setCountryBeachesFailedAction => {
         return {
           type: actionTypes.SET_COUNTRY_BEACHES_FAILED,
           payload: error
         };
       };

type PromiseAction = Promise<Action>;
// eslint-disable-next-line no-use-before-define
type ThunkAction = (dispatch: Dispatch) => any;
type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;


export const setCountryBeaches = (route: string): ThunkAction => {
  return dispatch => {
    dispatch(setCountryBeachesStart());
    let finalRoute;
    if (process.env.NODE_ENV === 'production') {
      finalRoute = route.substr(3);
    } else {
      finalRoute = route
    }
    
    axios.get(finalRoute)
      .then(response => {
        dispatch(setCountryBeachesSucceed(response.data))
      }
    ).catch(err => {
        dispatch(setCountryBeachesFailed(err))
        console.log('error accesing the file',err)
      })


    }

}

