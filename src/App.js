import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import Graphics from './components/Graphics/Graphics';
import LandingPage from './containers/LandingPage/LandingPage';
import BeachDetails from './containers/BeachDetails/BeachDetails';
import NavDrawer from './components/Navigation/NavDrawer';
import LoadableAbout from './components/AsyncComponents/LoadableAbout';
import LoadableSearch from './components/AsyncComponents/LoadableSearch';


const DefaultContainer = () => {
  
  return(
    <React.Fragment>
      <NavDrawer/>
      <Switch>
        <Route path="/spain-map" component={LandingPage} />
        <Route path="/search" render={() => ( <LoadableSearch />)} />
        <Route path="/graphics" component={Graphics} />
        <Route path="/about" render={() => ( <LoadableAbout /> )}/>
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
