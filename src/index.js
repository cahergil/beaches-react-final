import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,  compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createMuiTheme } from '@material-ui/core/styles';
import  ThemeProvider from '@material-ui/styles/ThemeProvider'



import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/index';

const theme = createMuiTheme({
  palette: {
    // primary: { 500: '#2196F3'},
    primary: {
   
      main: '#2196F3',
      dark: '#074c82'
     
    },
    secondary: {
      light: '#FABC3D',
      main: '#D4AC16',
      dark: '#976703'
    },
    text: {
      primary: '#000',
      secondary: '#D4AC16'

    }
  },
  typography: {
    htmlFontSize: 10,
    useNextVariants: true
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


ReactDOM.render(
  // <BrowserRouter basename="/playas-react" > apply this in production(gh-pages)
  <Provider store={store}>
    {/* <BrowserRouter basename="/spain-beaches-react"> */}
    <HashRouter basename="/spain-beaches-react">
      <ThemeProvider theme={theme} >
        <App />
      </ThemeProvider>
    </HashRouter>
    {/* </BrowserRouter> */}
  </Provider>
 
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
