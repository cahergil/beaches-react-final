import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Graphics from './components/Graphics/Graphics';
import Search from './containers/Search/Search';
import LandingPage from './containers/LandingPage/LandingPage';
import BeachDetails from './containers/BeachDetails/BeachDetails';
import About from './containers/About/About';
import NavDrawer from './components/Navigation/NavDrawer';
import * as actionsMapArea from './store/actions/mapArea';

const DefaultContainer = ({onSetMapArea}) => {
  
  return(
    <React.Fragment>
      <NavDrawer onSetMapArea={onSetMapArea}/>
      <Switch>
        <Route path="/spain-map" component={LandingPage} />
        <Route path="/search" component={Search} />
        <Route path="/graphics" component={Graphics} />
        <Route path="/about" component={About} />
        <Redirect to="/spain-map" />
      </Switch>
    </React.Fragment>
  );
}

const BeachDetailsContainer = () => (
  <Switch>
    <Route path="/details/beach/" component={BeachDetails} />
  </Switch>
);

const  App = props => {
  return (
    <div className="App">
      <Switch>
        <Route path="/details/beach/" component={BeachDetailsContainer} />
        <Route path="/" render={() => <DefaultContainer {...props}/>} />
      </Switch>
     </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    onSetMapArea: (value) => dispatch(actionsMapArea.setMapArea(value))
  }
}
 export default connect(null, mapDispatchToProps)(App);

