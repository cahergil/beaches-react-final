
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import NavDrawer from '../../components/Navigation/NavDrawer';
import ResultsContent from '../../components/LandingPageResults/ResultsContent/ResultsContent';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import * as beachesActions from '../../store/actions/beaches';
import * as searchFiltersActions from '../../store/actions/searchFilters';
import * as mapsFilterActions from '../../store/actions/mapFilters';
import * as mapsAreaActions from '../../store/actions/mapArea';
import * as utils from '../../Utils/Utils';


const useStyles = makeStyles({
  rootWrap: {
    position: 'relative',
  },
  root: {
    
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyContent: 'center',
    gridRowGap: '2rem',
    margin: '3rem'
  },
  title: {
    fontSize: '3rem',
    opacity: '0.87',
    fontWeight: '300'
  },
  circleProgressRoot: {
    marginTop: '10rem',
    justifySelf: 'center'
  }
});


const Search = (props) => {
  const {  beachesList, filters,actions } = props;
  const classes = useStyles();
  const [filteredBeachesList, setFilteredBeachesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const element = document.getElementById('navbar');
    if (element) {
      element.scrollIntoView();
    }
  }, []);
  useEffect(() => {
    actions.onSetCountryBeaches('../playas.json');
    return () => {
      actions.onSetReturnFromDetails(false);
 
    }
  }, [actions]);
  
  useEffect(() => {
    if (beachesList.length === 0) {
      return;
    }
    setLoading(true);
    const filterObject = {};
    if (filters.nudism) {
      filterObject['nudismo'] = utils.translateYesNoIntoSpanish(filters.nudism);
    }
    if (filters.blueFlag) {
      filterObject['bandera_azul'] = utils.translateYesNoIntoSpanish(filters.blueFlag)
    }
    if (filters.surfingArea) {
      filterObject['zona_surf'] = utils.translateYesNoIntoSpanish(filters.surfingArea)
      
    }
    if (filters.beachBar) {
      filterObject['establecimiento_comida'] = utils.translateYesNoIntoSpanish(filters.beachBar)
      
    }
    if (filters.nauticsRental) {
      filterObject['alquiler_nauticos'] = utils.translateYesNoIntoSpanish(filters.nauticsRental)
      
    }
    if (filters.divingArea) {
      filterObject['submarinismo'] = utils.translateYesNoIntoSpanish(filters.divingArea)
      
    }
    if (filters.sunbedRental) {
      filterObject['alquiler_hamacas'] = utils.translateYesNoIntoSpanish(filters.sunbedRental)
      
    }
    if (filters.beachUmbrellaRental) {
      filterObject['alquiler_sombrillas'] = utils.translateYesNoIntoSpanish(filters.beachUmbrellaRental)
      
    }
    if (filters.disabledPersons) {
      filterObject['acceso_discapacitados'] = utils.translateYesNoIntoSpanish(filters.disabledPersons)
      
    }
    if (filters.promenade) {
      filterObject['paseo_maritimo'] = utils.translateYesNoIntoSpanish(filters.promenade);

    }
    if (filters.occupancy !== 'All') {
      filterObject['grado_ocupacion'] = utils.translateOccupancyIntoSpanish(filters.occupancy)
    }
    if (filters.searchText.trim()) {
      filterObject[`${filters.selectText}`] = filters.searchText; 
    }
    if (filters.hospitalDistance) {
      filterObject['distancia_hospital'] = filters.hospitalDistance;
    }
    if (filters.beachLength) {
      filterObject['longitud'] = filters.beachLength;
    }
    
    const tempBeaches = beachesList.filter(beach => {
      const keys = Object.keys(filterObject);
      return keys.every(key => {
        if (key === 'termino_municipal' || key === 'nombre' || key === 'comunidad_autonoma') {
          const regex = new RegExp("" + filterObject[key] + "", "i");
          return beach[key].match(regex)
        }
        if (key === 'distancia_hospital') {
          let distance = beach[key];
          if (!distance) {
            distance = '30 Km';
            // return false, there are almost 100 record not informed;
          }
          if (distance) {
            if (distance === 'Al lado') {
              distance = "0 Km"
            }
            return utils.includeDistance(distance, filterObject[key]);
          }
        }
        if (key === 'longitud') {
          let len = beach[key];
          if (!len) {
            len = '0 metros';
          }
          return utils.includeLength(len, filterObject[key]);
        }
        return beach[key] === filterObject[key];
      });
    
    });
    setFilteredBeachesList(tempBeaches);
    setLoading(false);


  },[beachesList, filters])
  
  let resultContent = <ResultsContent beachesList={filteredBeachesList} />
  if (loading) {
    resultContent = <CircularProgress
      color="primary"
      size={80}
      thickness={3.6}
      classes={{ root: classes.circleProgressRoot }}
    />;
  }
  return (
    <section className={classes.rootWrap}>
      <NavDrawer onSetMapArea={actions.onSetMapArea}/>
      <div className={classes.root}>
        <div className={classes.title}>Advanced Search</div>
        <SearchFilters 
          filters={filters}
          actions={actions}
        />
        {resultContent}
      </div>
    </section>
  );
};
const mapStateToProps = state => {
  return {
    beachesList: state.beaches.beachesList,
    filters: state.searchFilters
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      onSetCountryBeaches: (route) => dispatch(beachesActions.setCountryBeaches(route)),
      onSetNudism: (value) => dispatch(searchFiltersActions.setNudism(value)),
      onSetBlueFlag: (value) => dispatch(searchFiltersActions.setBlueFlag(value)),
      onSetSurfingArea: (value) => dispatch(searchFiltersActions.setSurfingArea(value)),
      onSetBeachBar: (value) => dispatch(searchFiltersActions.setBeachBar(value)),
      onSetNauticsRental: (value) => dispatch(searchFiltersActions.setNauticsRental(value)),
      onSetDivingArea: (value) => dispatch(searchFiltersActions.setDivingArea(value)),
      onSetSunbedRental: (value) => dispatch(searchFiltersActions.setSunbedRental(value)),
      onSetUmbrellaBeachRental: (value) => dispatch(searchFiltersActions.setUmbrellaBeachRental(value)),
      onSetDisabledPersons: (value) => dispatch(searchFiltersActions.setDisabledPersons(value)),
      onSetOccupancy: (value) => dispatch(searchFiltersActions.setOcuppancy(value)),
      onSetPromenade: (value) => dispatch(searchFiltersActions.setPromenade(value)),
      onSetHospitalDistance: (value) => dispatch(searchFiltersActions.setHospitalDistance(value)),
      onSetBeachLength: (value) => dispatch(searchFiltersActions.setBeachLength(value)),
      onSetSelectText: (value) => dispatch(searchFiltersActions.setSelectText(value)),
      onSetSearchText: (value) => dispatch(searchFiltersActions.setSearchText(value)),
      onResetFilters: () => dispatch(searchFiltersActions.setReset()),
      onSetReturnFromDetails: (value) => dispatch(mapsFilterActions.setReturnFromDetails(value)),
      onSetMapArea: (value) => dispatch(mapsAreaActions.setMapArea(value))
    }
    
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Search);