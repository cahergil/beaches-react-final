// @flow
import * as React from 'react';
import { useEffect} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import type { RouterHistory, Match, Location} from 'react-router-dom';
import type { Dispatch } from 'redux';
import PropTypes from 'prop-types';

import Map from '../../components/MapSpain/MapSpain';
import MapResults from '../MapResults/MapResults';
import * as actionsMapFilters from '../../store/actions/mapFilters';
import type { State } from '../../store/reducers/index'
import type { Action } from '../../store/reducers/index'



type OwnProps = {||};

type Props = {|
  ...OwnProps,
  preSelectedArea: string,
  onSetReturnFromDetails: (value: boolean) => void,
  onSetMapArea: (value: string) => void,
  onClickMapThunk: (fromDetails: boolean, regionId: string) => void,
  history: RouterHistory,
  match: Match,
  location: Location
|};

const LandingPage = ({onSetReturnFromDetails,onSetMapArea, onClickMapThunk,preSelectedArea, history, match, location}: Props) => {
  
  let mapRef = React.createRef();
  
  const handleMapClick = (region: string, areaId: string) => {
    history.push({
      pathname: '/spain-map/' + region,
      state: '/spain-map/'
    });
    
    // solves issue when comming back from details
     onSetReturnFromDetails(false);
     onSetMapArea(areaId);
   
    
  };
  
  // when clicking in map-spain Link it removes the selected area
  useEffect(()=>{
    if(location.pathname === '/spain-map') {
      
      if(mapRef.current) {
            const area = mapRef.current.getCurrentArea();
        // in the initial load of the map this is null
        if(area) {
          area.showAsSelected = false;
          mapRef.current.state.mapObject.returnInitialColor(area);
        }
      }
    }
  }, [location.pathname, mapRef]);

  // leaving the page causes to clean the selected map area
  // if the user go to details, it later sets the selected area
  useEffect(() => {
    return () => {
      onSetMapArea('');
    };
  }, [onSetMapArea]);
  return (
    <div>
      <Map
        ref={mapRef}
        onMapClicked={(region: string, areaId: string) => handleMapClick(region, areaId)}
        preSelectedArea={preSelectedArea}
      />
      <Route path={match.url + '/:region'} component={MapResults} />
    </div>
  );
};

const mapStateToProps = (state: State )=> {
  return {
    preSelectedArea: state.mapResultsFilters.regionId        
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onSetReturnFromDetails: (value: boolean) =>
      dispatch(actionsMapFilters.setReturnFromDetails(value)),
    onSetMapArea: (value: string) =>
      dispatch(actionsMapFilters.setMapArea(value))
  };
};

LandingPage.propTypes = {
  onSetReturnFromDetails: PropTypes.func.isRequired,
  onSetMapArea: PropTypes.func.isRequired,
  preSelectedArea: PropTypes.string.isRequired
};

export default (connect(mapStateToProps, mapDispatchToProps)(LandingPage): React.AbstractComponent<OwnProps>);