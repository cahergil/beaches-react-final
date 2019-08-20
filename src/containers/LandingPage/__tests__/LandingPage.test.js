import React from 'react';
import {  combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {  renderWithReduxAndRouter } from '../../../../tests/test-utils'

import LandingPage from '../LandingPage';

import mapAreaReducer from '../../../store/reducers/mapArea';


const initialState = {
  mapArea: { regionId: '' }
};
const rootReducer = combineReducers({
  mapArea: mapAreaReducer
 });


describe('tests associated with LandingPage', () => {
  
  test('<LandingPage/>', () => {
    const route = { route: '/spain-map/' }
    // example of passing dynamic param :region
    // const match = { params: {region: ''}, isExact:false, path:"", url:"/spain-map"}
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const match = { isExact:false, path:"", url:"/spain-map"}
    const { container} = renderWithReduxAndRouter(
      <LandingPage match={match} />,
      route,
      store
    );
    expect(container).toBeDefined();
  });
  
});