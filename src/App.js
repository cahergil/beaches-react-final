import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import Graphics from './components/Graphics/Graphics';
import Search from './containers/Search/Search';
import LandingPage from './containers/LandingPage/LandingPage';
import BeachDetails from './containers/BeachDetails/BeachDetails';
import About from './components/About/About';



const  App = props => {
  
  return (
    <div className="App">

      {/* <NavDrawer /> */}
      <Switch>
        <Route path="/spain-map"  component={LandingPage} />
        <Route path="/search" component={Search} />
        <Route path="/details/beach/" component={BeachDetails} />
        <Route path="/graphics" component={Graphics} />
        <Route path="/about" component={About} />
        <Redirect to="/spain-map"  />
      </Switch>
    </div>
  );
}

 export default App;

