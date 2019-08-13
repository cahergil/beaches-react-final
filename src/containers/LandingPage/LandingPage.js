import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Map from '../../components/MapSpain/MapSpain';
import MapResults from '../MapResults/MapResults';
import * as actionsMapFilters from '../../store/actions/mapFilters';
import * as actionsMapArea from '../../store/actions/mapArea';


const LandingPage = (props) => {
  const { onSetReturnFromDetails, onSetMapArea, preSelectedArea } = props;
  
  const handleMapClick = (region) => {
    props.history.push({ pathname: '/spain-map/' + region, state: '/spain-map/' });
    // solves issue when comming back from details
    onSetReturnFromDetails(false);
  };

  return (
    <div>
     
      <Map 
        onMapClicked={(value) => handleMapClick(value)}
        onSetMapArea={onSetMapArea}
        preSelectedArea={preSelectedArea}
      />
      <Route path={props.match.url + '/:region'} component={MapResults} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    preSelectedArea: state.mapArea.regionId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSetReturnFromDetails: (value) => dispatch(actionsMapFilters.setReturnFromDetails(value)),
    onSetMapArea: (value) => dispatch(actionsMapArea.setMapArea(value))
  }
};

LandingPage.propTypes = {
  onSetReturnFromDetails: PropTypes.func.isRequired,
  onSetMapArea: PropTypes.func.isRequired,
  preSelectedArea: PropTypes.string.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);