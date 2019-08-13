import React from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,  compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import  ThemeProvider from '@material-ui/styles/ThemeProvider'

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/index';
import theme from './theme';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


ReactDOM.render(
  
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme} >
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>
 
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
