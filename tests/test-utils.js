import React from 'react';
import { Router, HashRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'

function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<HashRouter history={history}>{ui}</HashRouter>, renderOptions);
  return {
    ...utils,
    history
  }
}

function renderWithRedux(ui,{initialState, reducer ,store = createStore(reducer, initialState)} = {}) {
  return {
    ...render(
      <Provider store={store}>{ui}</Provider>),
    store
  }
}
function renderWithReduxAndHashRouter(ui, { route = "/" }, { initialState, reducer, store = createStore(reducer, initialState) } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={store}>
        <HashRouter history={history}>
          {ui}
        </HashRouter>
      </Provider>),
    store
  }
}
// function renderWithReduxAndHashRouter(ui, { route = "/" }, { initialState, reducer, store = createStore(reducer, initialState) } = {}) {
//   const history = createMemoryHistory({ initialEntries: [route] });
//   return {
//     ...render(
//       <Provider store={store}>
//         <HashRouter history={history}>
//           {ui}
//         </HashRouter>
//       </Provider>),
//     store
//   }
// }

export { Simulate, wait, render, cleanup, fireEvent } from '@testing-library/react'
export { renderWithRouter, renderWithRedux, renderWithReduxAndHashRouter}