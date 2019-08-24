import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import './App.scss';
import Graphics from './components/Graphics/Graphics';
import LandingPage from './containers/LandingPage/LandingPage';
import BeachDetails from './containers/BeachDetails/BeachDetails';
import NavDrawer from './components/Navigation/NavDrawer';
import SpinnerWhenRouting from './components/SpinnerWhenRouting/SpinnerWhenRouting'
import * as actionsMapArea from './store/actions/mapArea';


const SearchLoadable = Loadable({
  loader: () => import('./containers/Search/Search'),
  loading: () => <SpinnerWhenRouting />
})

const AboutLoadable = Loadable({
  loader: () => import('./containers/About/About'),
  loading: () => <SpinnerWhenRouting />
})




const DefaultContainer = ({onSetMapArea}) => {
  
  return(
    <React.Fragment>
      <NavDrawer onSetMapArea={onSetMapArea}/>
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
const mapDispatchToProps = dispatch => {
  return {
    onSetMapArea: (value) => dispatch(actionsMapArea.setMapArea(value))
  }
}
 export default connect(null, mapDispatchToProps)(App);

