import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Map from '../../components/MapSpain/MapSpain';
import { Route } from 'react-router-dom';

import MapResults from '../MapResults/MapResults';
import * as actions from '../../store/actions/beaches';

const LandingPage = (props) => {
  
    
  
  useEffect(() => {
    props.onSetCountryBeaches();
    props.history.push({ pathname: '/spain-map' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMapClick = (region) => {
    
    props.history.push({ pathname: '/spain-map/' + region });
  }
  return (
    <div>
      <Map onMapClicked={(value) => handleMapClick(value)}/>
      <Route path={props.match.url + '/:region'} component={MapResults} />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSetCountryBeaches: () => dispatch(actions.setCountryBeaches())
  }
}

export default connect(null, mapDispatchToProps)(LandingPage);
