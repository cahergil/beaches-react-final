import React, { useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.scss';
import NavDrawer from './components/Navigation/NavDrawer';
import Graphics from './components/Graphics/Graphics';
import Search from './components/Search/Search';
import LandingPage from './components/LandingPage/LandingPage';
import * as actions from './store/actions/beaches';

const  App = props => {

  useEffect(() => {
    // load jsofile and set state
    props.onSetCountryBeaches();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">

      <NavDrawer />
      <Route path="/" exact component={LandingPage}/>
      <Route path="/search"  component={Search}/>
      <Route path="/graphics"  component={Graphics}/>
      
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSetCountryBeaches: () => dispatch(actions.setCountryBeaches())
  }
}


 export default connect(null, mapDispatchToProps)(App);

