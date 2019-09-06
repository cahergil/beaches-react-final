import React from 'react';
import {  combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {  renderWithReduxAndRouter } from '../../../../tests/test-utils'

import LandingPage from '../LandingPage';

import mapFiltersReducer from '../../../store/reducers/mapFilters';


const initialState = {
 mapResultsFilters: {
   select: 'termino_municipal',
  input: '',
  return: false,
  regionId: ''
 }
};
const rootReducer = combineReducers({
  mapResultsFilters: mapFiltersReducer
 });


describe('tests associated with LandingPage', () => {
  
  test('<LandingPage/>', () => {
    const route = { route: '/spain-map/' }
    // example of passing dynamic param :region
    // const match = { params: {region: ''}, isExact:false, path:"", url:"/spain-map"}
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const match = { isExact:true, path:"", url:"/spain-map"}
    const location = { pathname: '/spain-map'}
    const { container} = renderWithReduxAndRouter(
      <LandingPage match={match} location={location} />,
      route,
      store
    );
    expect(container).toBeDefined();
  });
  
});