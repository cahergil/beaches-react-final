import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import beachesReducer from './store/reducers/beaches';
import { createMuiTheme } from '@material-ui/core/styles';
import  ThemeProvider from '@material-ui/styles/ThemeProvider'
import pink from '@material-ui/core/colors/pink';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#2196F3'},
    secondary: pink,
    text: {
      primary: '#000',
      secondary: pink

    }
  },
  typography: {
    htmlFontSize: 10,
    useNextVariants: true
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  beachesList: beachesReducer
});


const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


ReactDOM.render(
  // <BrowserRouter basename="/playas-react" > apply this in production(gh-pages)
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme} >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
 
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
