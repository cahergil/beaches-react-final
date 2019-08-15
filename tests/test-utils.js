import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history'



function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions);
  return {
    ...utils,
    history
  }
}

// function renderWithRedux(ui,{initialState ,store = createStore(reducer, initialState)} = {}) {
//   return {
//     ...render(
//       <Provider store={store}>{ui}</Provider>),
//     store
//   }
// }
// function renderWithReduxAndHashRouter(ui, { route = "/" }, { initialState, store = createStore(reducer, initialState) } = {}) {
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
export { renderWithRouter}