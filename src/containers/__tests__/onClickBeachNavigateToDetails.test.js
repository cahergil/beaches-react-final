import React from 'react';
import {  combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { waitForElement, fireEvent, renderWithReduxAndRouter } from '../../../tests/test-utils';
import App from '../../App';
import mapResultsFilterReducer from '../../store/reducers/mapFilters';
import beachesReducer from '../../store/reducers/beaches';

const initialState = {
  mapResultsFilters: {
    select: 'termino_municipal',
    input: '',
    return: false,
    regionId: '' 
  }
 
};

const rootReducer = combineReducers({
  mapResultsFilters: mapResultsFilterReducer,
  beaches: beachesReducer
});

function render() {
  const route = { route: '/spain-map/' }
    const match = { isExact: false, path: "/spain-map", url: "/spain-map" }
    const location = { pathname: '/spain-map'}
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const utils = renderWithReduxAndRouter(
      <App match={match} location={location}/>,
      route, 
      store
    );
    const region = 'Cantabria';
    utils.history.push({ pathname: '/spain-map/' + region });
    const beachName = 'oyambre'
    const regex = new RegExp(''+ beachName + '','i');
    // const beach = await waitForElement(()=> getByText(/oyambre beach/i));
    return {...utils,  regex}
}

test('should send the user to Details component when clicking on beach name', async() => {
    const { getByTestId, getByText, getAllByText, regex} = render();
    const beach = await waitForElement(()=> getByText(regex));
    expect(beach).toBeInTheDocument();
    const leftClick = { button: 0};
    fireEvent.click(beach, leftClick);
    const details = await waitForElement(()=> getByTestId('details'));
    expect(details).toBeInTheDocument()
    // grab the first element found, presumably in the header
    const beachNameInDetails = getAllByText(regex)[0];   
    expect(beachNameInDetails).toBeInTheDocument();
});

test.only('should send the user to Details component when clicking on beach image', async() => {
    const { getByTestId, getAllByText, getAllByTestId, regex} = render();
    const beach = await waitForElement(()=> getAllByTestId('beach-image')[0]);
    expect(beach).toBeInTheDocument();
    const leftClick = { button: 0};
    fireEvent.click(beach, leftClick);
    const details = await waitForElement(()=> getByTestId('details'));
    expect(details).toBeInTheDocument()
    // grab the first element found, presumably in the header
    const beachNameInDetails = getAllByText(regex)[0];   
    expect(beachNameInDetails).toBeInTheDocument();
});