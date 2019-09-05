import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loadable from 'react-loadable';

import './App.scss';
import Graphics from './components/Graphics/Graphics';
import LandingPage from './containers/LandingPage/LandingPage';
import BeachDetails from './containers/BeachDetails/BeachDetails';
import NavDrawer from './components/Navigation/NavDrawer';
import SpinnerWhenRouting from './components/SpinnerWhenRouting/SpinnerWhenRouting'


const SearchLoadable = Loadable({
  loader: () => import('./containers/Search/Search'),
  loading: () => <SpinnerWhenRouting />
})

const AboutLoadable = Loadable({
  loader: () => import('./containers/About/About'),
  loading: () => <SpinnerWhenRouting />
})




const DefaultContainer = () => {
  
  return(
    <React.Fragment>
      <NavDrawer/>
      <Switch>
        <Route path="/spain-map" component={LandingPage} />
        <Route path="/search" render={() => (
          <SearchLoadable />
        
        )} />
        <Route path="/graphics" component={Graphics} />
        <Route path="/about" render={() => (
          <AboutLoadable />      
        )}/>
        <Redirect to="/spain-map" />
      </Switch>
    </React.Fragment>
  );
}

const  App = props => {
  return (
    <div className="App">
      <Switch>
        <Route path="/details/beach/" component={BeachDetails} />
        <Route path="/" render={() => <DefaultContainer {...props}/>} />
      </Switch>
     </div>
  );
}
export default App;
