import React, { useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
// import NavDrawer from './components/Navigation/NavDrawer';
import Graphics from './components/Graphics/Graphics';
import Search from './components/Search/Search';
import LandingPage from './containers/LandingPage/LandingPage';
import BeachDetails from './containers/BeachDetails/BeachDetails';
import * as actions from './store/actions/beaches';
import About from './components/About/About';



const  App = props => {
  
  useEffect(() => {
    // load jsofile and set state
    // props.onSetCountryBeaches();
    // props.history.push({ pathname: '/spain-map' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

const mapDispatchToProps = dispatch => {
  return {
    onSetCountryBeaches: () => dispatch(actions.setCountryBeaches())
  }
}


 export default connect(null, mapDispatchToProps)(App);
//  export default App;

