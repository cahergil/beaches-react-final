import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMemoryHistory } from 'history'


import theme from '../src/theme';

function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(
    <ThemeProvider theme={theme}>
      <Router history={history}>
        {ui}
      </Router>
    </ThemeProvider>
    , renderOptions);
  return {
    ...utils,
    history
  }
}

function renderWithRedux(ui, store) {
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {ui}
        </Provider>
      </ThemeProvider>
      ),
    store
  }
}
function renderWithReduxAndRouter(ui, { route = "/" }, store) {
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
    store,
    history
    }
  }
  
  
export { Simulate, wait, waitForElement, waitForDomChange,render, rerender, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

export { renderWithRouter, renderWithRedux, renderWithReduxAndRouter}