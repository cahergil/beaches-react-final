import React from 'react';
import { Route } from 'react-router-dom';

import Map from '../../components/MapSpain/MapSpain';
import MapResults from '../MapResults/MapResults';

const LandingPage = (props) => {
  
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

export default LandingPage;