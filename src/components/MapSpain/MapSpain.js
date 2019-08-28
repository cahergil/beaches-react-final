import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AmCharts  from "@amcharts/amcharts3-react";

import {regionMap} from './types';



const useStyles = makeStyles({
  root: {
    height: '100vh'
  },
  mapDiv: {
    width: '100%',
    height: '70vh'
  },
  headerTitle: {
    fontWeight: '300',
    textAlign: 'center',
    fontSize: '5rem',
    padding: '2rem 0rem',
    color: '#777'
  },
  areaColor: {
    color: '#BDBDBD'
  }
});



const MapSpain = React.memo((props) => {
  const { onMapClicked, onSetMapArea, preSelectedArea } = props;
  const [mapObject, setMapObject] = useState(null);
  const classes = useStyles();
  const mapComunidades = new Map();

  
  

  useEffect(() => {
    
    mapComunidades.set('ES-AN', regionMap.ANDALUCIA);
    mapComunidades.set('ES-AS', regionMap.ASTURIAS);
    mapComunidades.set('ES-CB', regionMap.CANTABRIA);
    mapComunidades.set('ES-CE', regionMap.CEUTA);
    mapComunidades.set('ES-CN', regionMap.CANARIAS);
    mapComunidades.set('ES-CT', regionMap.CATALUÑA);
    mapComunidades.set('ES-GA', regionMap.GALICIA);
    mapComunidades.set('ES-IB', regionMap.BALEARES);
    mapComunidades.set('ES-MC', regionMap.MURCIA);
    mapComunidades.set('ES-ML', regionMap.MELILLA);
    mapComunidades.set('ES-PV', regionMap.EUSKADI);
    mapComunidades.set('ES-VC', regionMap.VALENCIA);

  }, [mapComunidades]);
  const areaColor = '#BDBDBD';
  const dataProvider = {
    map: 'spain2Low',
    areas: [
      { id: 'ES-AN', color: areaColor },
      { id: 'ES-AS', color: areaColor },
      { id: 'ES-CB', color: areaColor },
      { id: 'ES-CE', color: areaColor },
      { id: 'ES-CN', color: areaColor },
      { id: 'ES-CT', color: areaColor },
      { id: 'ES-GA', color: areaColor },
      { id: 'ES-IB', color: areaColor },
      { id: 'ES-MC', color: areaColor },
      { id: 'ES-ML', color: areaColor },
      { id: 'ES-PV', color: areaColor },
      { id: 'ES-VC', color: areaColor }
    ]
  };

  // 
  const handleRegionClick = (e) => {
    const areaId = e.mapObject.id;
    const region = mapComunidades.get(areaId);
    onMapClicked(region);
    // unselect previous area
    const area = mapObject.getObjectById(preSelectedArea);
    if(area) {
      area.showAsSelected = false;
      mapObject.returnInitialColor(area)

    }
    
    onSetMapArea(areaId)
     
  }

  const handlePreSelect = (e) => {
    const map = e.chart;
    // get map instance to use it in handleRegionClick
    setMapObject(map);
    const area = map.getObjectById(preSelectedArea);
    if(area) {
      area.showAsSelected = true
      map.returnInitialColor(area)

    }
  }
  return (
    <section id="map">
      <div className={classes.headerTitle}>
        Select a region
      </div>
      <div id="mapdiv">
        <AmCharts.React
          
          className={classes.mapDiv}
          options={{
            "type": "map",
            "zoomControl": {
              "homeButtonEnabled": false,
              "zoomControlEnabled": false,
              "panControlEnabled": false,
            },
            // "backgroundColor": "#90CAF9",
            "backgroundAlpha": 1,
            "dataProvider": dataProvider,
            "areasSettings": {
              "outlineColor": '#fff',
              "outlineAlpha": 1,
              "outlineThickness": 1,
              "autoZoom": false,
              "selectedColor": '#D4AC16',
              // "selectedColor": '#E91E63',
              // "selectedOutlineColor": '#33fddd',
              // "selectedOutlineThickness": 1,
              "selectable": true,
              rollOverColor: '#D4AC16'
              // rollOverColor: '#009ce0'
              // "rollOverColor": '#fff'
            },
            "listeners": [
              {
                "event": "clickMapObject",
                "method": (e) => { handleRegionClick(e) }
              },
              {
                "event": "init",
                "method": (e) => { handlePreSelect(e)}
              }  
            ]
            
          }} // options
        />
      </div>
    </section>
  )
}, () => {
    return true;
});

MapSpain.propTypes = {
  onMapClicked: PropTypes.func.isRequired,
  onSetMapArea: PropTypes.func.isRequired,
  preSelectedArea: PropTypes.string.isRequired
}

export default MapSpain;