import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
// import { createMount } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history'
import { render, fireEvent, cleanup} from '@testing-library/react';
import { Router } from 'react-router-dom';
import _ from 'lodash';

import App from './App';
import mapAreaReducer from './store/reducers/mapArea';
import beachesReducer from './store/reducers/beaches';
import searchFiltersReducer from './store/reducers/searchFilters'
import theme from './theme';
jest.unmock('lodash');



const initialState = {
  mapArea: { regionId: '' },
  beaches: {
    beachesList: [],
    regionBeachesList: [],
    error: false
  },
  searchFilters: {
    nudism: false,
    blueFlag: false,
    surfingArea: false,
    beachBar: false,
    nauticsRental: false,
    divingArea: false,
    sunbedRental: false,
    beachUmbrellaRental: false,
    disabledPersons: false,
    occupancy: 'All',
    promenade: false,
    hospitalDistance: 120,
    beachLength: 28000,
    selectText: 'termino_municipal',
    searchText: ''
  }
};
const rootReducer = combineReducers({ 
  mapArea: mapAreaReducer,
  beaches: beachesReducer,
  searchFilters: searchFiltersReducer
});

function renderWithReduxAndRouter(ui, { route = "/" }, { store = createStore(rootReducer, initialState, applyMiddleware(thunk)) } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={history}>
            {ui}
          </Router>
        </Provider>
      </ThemeProvider>
    ),
    store
  }
}
beforeEach(() => {

 
})
afterEach(() => {
  cleanup();

})

test('<LandingPage/> screen renders ok', async () => {
  // initial route
  const route = { route: '/map-spain/' }
  // scrollintoView is not a function
  window.HTMLElement.prototype.scrollIntoView = function () { };
  const { container} = renderWithReduxAndRouter(<App />, route);
  
  // initial SCREEN loads correctly
  expect(container.textContent).toMatch(/select a region/i);
  
});

test('navigating to search screen is ok', async () => {
  const route = { route: '/map-spain/' }
  _.debounce = jest.fn((fn) => fn);
  // scrollintoView is not a function
  window.HTMLElement.prototype.scrollIntoView = function () { };
  const { getByText } = renderWithReduxAndRouter(<App />, route);
  // navigate to SEARCH
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/search/i), leftClick);

  const advancedSearchNode = await getByText(/advanced search/i);
  expect(advancedSearchNode).toBeTruthy();
  // other possibilities
  // expect(getByText(/advanced search/i)).toBeInTheDocument(); // should work
  // expect(getByText(/advanced search/i)).toBeDefined; // should workd
});

test('navigating to about screen is ok', async () => {
  const route = { route: '/map-spain/' }
  // scrollintoView is not a function
  window.HTMLElement.prototype.scrollIntoView = function () { };
  const { getByText } = renderWithReduxAndRouter(<App />, route);
  // navigate to SEARCH
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/about/i), leftClick);

  const aboutNode = await getByText(/stack/i);
  expect(aboutNode).toBeTruthy();
  // other possibilities
  // expect(getByText(/advanced search/i)).toBeInTheDocument(); // should work
  // expect(getByText(/advanced search/i)).toBeDefined; // should workd
});