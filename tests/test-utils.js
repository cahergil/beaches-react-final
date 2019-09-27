import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMemoryHistory } from 'history'


import theme from '../src/theme';


function customRenderWithReduxAndRouter(ui, { route = '/', ...renderOptions } = {}, store) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
          {ui}
        </Router>
      </Provider>
    </ThemeProvider>
    , renderOptions);
  return {
    ...utils,
    history,
    store,
    rerender: (ui, options, store) => customRenderWithReduxAndRouter(ui, { container: utils.container, ...options }, store)
  }
}


function customRenderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
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
    history,
    rerender: (ui, options) => customRenderWithRouter(ui, { container: utils.container, ...options })
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

export { wait, waitForElement, waitForDomChange, render, rerender, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

export { renderWithRouter, renderWithRedux, renderWithReduxAndRouter, customRenderWithRouter, customRenderWithReduxAndRouter }