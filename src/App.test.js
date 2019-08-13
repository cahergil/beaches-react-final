import React from 'react';
import App from './App';
import mapAreaReducer  from './store/reducers/mapArea';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { render, act } from '@testing-library/react';
import { Router } from 'react-router-dom';

const initialState = { mapArea: { regionId: '' } };
const rootReducer = combineReducers({ mapArea: mapAreaReducer });

function renderWithReduxAndHashRouter(ui, { route = "/" }, { store = createStore(rootReducer, initialState) } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          {ui}
        </Router>
      </Provider>),
    store
  }
}
// afterEach(cleanup)

test('full app rendering/navigating', () => {
   const route  = { route: '/map-spain/'}
  // const reduxInfo = { initialState, mapAreaReducer}
  const { container } = renderWithReduxAndHashRouter(<App />, route);
  expect(container.textContent).toMatch(/select a region/i);
}) 