
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import NavDrawer from '../../components/Navigation/NavDrawer';
import ResultsContent from '../../components/LandingPageResults/ResultsContent/ResultsContent';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import * as beachesActions from '../../store/actions/beaches';
import * as searchFiltersActions from '../../store/actions/searchFilters';
import * as utils from '../../Utils/Utils';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyContent: 'center',
    gridRowGap: '2rem',
    margin: '3rem'
  },
  title: {
    fontSize: '3rem',
    opacity: '0.87'
  },
  circleProgressRoot: {
    marginTop: '10rem',
    justifySelf: 'center'
    // minHeight: '50rem'
    // display: 'flex',
    // flexDirection: 'column',
    // width: '100%',
    // height: '70vh',
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});


const Search = (props) => {
  const {  beachesList, filters,actions } = props;
  const classes = useStyles();
  const [filteredBeachesList, setFilteredBeachesList] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    actions.onSetCountryBeaches('../playas.json');
  }, [actions]);
  
  useEffect(() => {
    if (beachesList.length === 0) {
      return;
    }
    setLoading(true);
    const filterObject = {};
    if (filters.nudism) {
      filterObject['nudismo'] = utils.translateIntoSpanish(filters.nudism);
    }
    if (filters.blueFlag) {
      filterObject['bandera_azul'] = utils.translateIntoSpanish(filters.blueFlag)
    }
    if (filters.surfingArea) {
      filterObject['zona_surf'] = utils.translateIntoSpanish(filters.surfingArea)
      
    }
    if (filters.beachBar) {
      filterObject['establecimiento_comida'] = utils.translateIntoSpanish(filters.beachBar)
      
    }
    if (filters.nauticsRental) {
      filterObject['alquiler_nauticos'] = utils.translateIntoSpanish(filters.nauticsRental)
      
    }
    if (filters.divingArea) {
      filterObject['submarinismo'] = utils.translateIntoSpanish(filters.divingArea)
      
    }
    if (filters.sunbedRental) {
      filterObject['alquiler_hamacas'] = utils.translateIntoSpanish(filters.sunbedRental)
      
    }
    if (filters.beachUmbrellaRental) {
      filterObject['alquiler_sombrillas'] = utils.translateIntoSpanish(filters.beachUmbrellaRental)
      
    }
    if (filters.disabledPersons) {
      filterObject['acceso_discapacitados'] = utils.translateIntoSpanish(filters.disabledPersons)
      
    }
    if (filters.searchText.trim()) {
      filterObject[`${filters.selectText}`] = filters.searchText; 
    }
    
    const tempBeaches = beachesList.filter(beach => {
      const keys = Object.keys(filterObject);
      return keys.every(key => {
        if (key === 'termino_municipal' || key === 'nombre' || key === 'comunidad_autonoma') {
          const regex = new RegExp("" + filterObject[key] + "", "i");
          return beach[key].match(regex)
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
    <section>
      <NavDrawer />
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
      onSetLength: (value) => dispatch(searchFiltersActions.setLength(value)),
      onSetSelectText: (value) => dispatch(searchFiltersActions.setSelectText(value)),
      onSetSearchText: (value) => dispatch(searchFiltersActions.setSearchText(value)),
      onResetFilters: () => dispatch(searchFiltersActions.setReset())
    }
    
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Search);