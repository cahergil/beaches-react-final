import React from 'react';
import {  combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { waitForElement, renderWithReduxAndRouter } from '../../../tests/test-utils';
import LandingPage from '../LandingPage/LandingPage';
import mapResultsFilterReducer from '../../store/reducers/mapFilters';
import mapAreaReducer from '../../store/reducers/mapArea';
import beachesReducer from '../../store/reducers/beaches';

const initialState = {
  mapArea: { regionId: '' },
  mapResultsFilters: {
    select: 'termino_municipal',
    input: '',
    return: false
  }
};

const rootReducer = combineReducers({
  mapArea: mapAreaReducer,
  mapResultsFilters: mapResultsFilterReducer,
  beaches: beachesReducer
});




test('should render correct region in <ResultsFilters/>', async() => {
    const route = { route: '/spain-map/' }
    const match = { isExact: false, path: "/spain-map", url: "/spain-map" }
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const { getByTestId, history } = renderWithReduxAndRouter(
      <LandingPage match={match} />,
      route, 
      store
    );
    const region = 'Cantabria';
    history.push({ pathname: '/spain-map/' + region });
    const regionElementNode =await waitForElement(
      () => getByTestId('region')
    );
   
    expect(regionElementNode.textContent).toBe(region);

});
test('should render items in <ResultsContent/>', async() => {
    const route = { route: '/spain-map/' }
    const match = { isExact: false, path: "/spain-map", url: "/spain-map" }
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const { getByTestId, history } = renderWithReduxAndRouter(
      <LandingPage match={match} />,
      route, 
      store
    );
    const region = 'Cantabria';
    history.push({ pathname: '/spain-map/' + region });
    const resultsElementNode = await waitForElement(
      () => getByTestId('content')
    );
   
    expect(resultsElementNode).toBeDefined();

});
