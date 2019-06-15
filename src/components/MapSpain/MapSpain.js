import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import AmCharts from "@amcharts/amcharts3-react";

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
  const { onMapClicked } = props;
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
  const handleRegionClick = (e) => {
    console.log(e.mapObject.id);
    const region = mapComunidades.get(e.mapObject.id);
    onMapClicked(region);

     
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
            // "backgroundColor": "#90CAF9",
            "backgroundAlpha": 1,
            "dataProvider": dataProvider,
            "areasSettings": {
              "outlineColor": '#fff',
              "outlineAlpha": 1,
              "outlineThickness": 1,
              "autoZoom": false,
              "selectedColor": '#E91E63',
              // "selectedOutlineColor": '#33fddd',
              // "selectedOutlineThickness": 1,
              "selectable": true,
              rollOverColor: '#009ce0'
              // "rollOverColor": '#fff'
            },
            "listeners":
              [{
                "event": "clickMapObject",
                "method": (e) => { handleRegionClick(e) }
              }]
            
          }} // options
        />
      </div>
    </section>
  )
}, () => {
    return true;
});


export default MapSpain;