// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core';
import queryString from 'query-string';

import Header from './../../components/Details/Header/Header';
import Presentation from './../../components/Details/Presentation/Presentation';
import Facilities from './../../components/Details/Facilities/Facilities';
import Location from './../../components/Details/Location/Location';
import * as actionsBeaches from '../../store/actions/beaches';
import * as actionsMapFilters from '../../store/actions/mapFilters';
import Title from './../../components/Details/Title/Title';
import Services from './../../components/Details/Service/Services';
import BeachObject from './../../components/Model/Model';
import Weather from '../../components/Details/Weather/Weather';
import { getDistance } from '../../Utils/Utils';
import type {Beach}  from './../../components/Model/Beach';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'repeat(6, min-content)',
    gridRowGap: '2rem',
    marginBottom: '2rem',
    marginLeft: '1rem',
    marginRight: '1rem'
  },
  sectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, min-content)',
    boxShadow: '2px 1px 5px #ccc',
    // mozboxshadow
    borderRadius: '5px',
    overflow: 'hidden'
  }
});

// in this case we don't have ownprops
// https://stackoverflow.com/questions/41198842/what-is-the-use-of-the-ownprops-arg-in-mapstatetoprops-and-mapdispatchtoprops
type OwnProps = {|
|}

type Props = {|
  ...OwnProps,
  beachesList: Array<Beach>,
  onSetCountryBeaches: (route: string) => void,
  onSetReturnFromDetails: (value: boolean) =>void,
  location: { search:string }

|}

const BeachDetails = (props:Props) => {
  const { beachesList, onSetCountryBeaches, onSetReturnFromDetails } = props;
  const [beach, setBeach] = useState(null);
  const [colorSchema, setColorSchema] = useState({ backgroundColor:'#FABC3D', color:'#000'})
  const [generalInfo, setGeneralInfo] = useState(null);
  const [nearbyBeaches, setNearbyBeaches] = useState(null);
  const [city, setCity] = useState(null);
  const [isBlueFlag, setIsBlueFlag] = useState(null);
  const classes = useStyles();
  
  useEffect(() => {
    const element = document.getElementById('header');
    if (element) {
      element.scrollIntoView();
    }
  }, []);
  
  useEffect(()=> {
    onSetCountryBeaches('../playas.json');
  }, [onSetCountryBeaches]);

  useEffect(() => {
    return () => {
   
      onSetReturnFromDetails(true);
    }
  }, [onSetReturnFromDetails]);

  useEffect(() => {
    const id = queryString.parse(props.location.search).id;
    const beach = beachesList.find(beach => beach.id === id);
    const generalInfo = {};
    if (beach) {
      // calculate nearby beaches
      const nearbyBeaches = [];
      // const beachLatLng = { lat: undefined, lng: undefined };
      const beachLatLng = { };
      beachLatLng['lat'] = parseFloat(beach.coordenada_y.replace(',', '.'));
      beachLatLng['lng'] = parseFloat(beach.coordenada_x.replace(',', '.'));

      nearbyBeaches.push({name: beach.nombre, lat: beachLatLng.lat, lng: beachLatLng.lng, id: beach.id})
      
      beachesList.forEach(element => {
        // const p1 = {lat: undefined, lng: undefined};
        const p1 = {};
        p1['lat'] = parseFloat(element.coordenada_y.replace(',', '.'));
        p1['lng'] = parseFloat(element.coordenada_x.replace(',', '.'));
        const distanceInMeters = getDistance(p1, beachLatLng);
        if (distanceInMeters < 15000) {
          // to not duplicate beach
          if (element.id !== beach.id && distanceInMeters !== 0) {
            nearbyBeaches.push({ name: element.nombre, lat: p1.lat, lng: p1.lng, id: element.id, distance: distanceInMeters })
          }
        }
      });
      
      
      // inform generalInfo fields
      generalInfo['termino_municipal'] = beach.termino_municipal;
      generalInfo['provincia'] = beach.provincia;
      generalInfo['comunidad_autonoma'] = beach.comunidad_autonoma;
      generalInfo['longitud'] = beach.longitud;
      generalInfo['anchura'] = beach.anchura;
      generalInfo['grado_ocupacion'] = beach.grado_ocupacion;
      generalInfo['paseo_maritimo'] = beach.paseo_maritimo;
      generalInfo['descripcion'] = beach.descripcion;
      generalInfo['images'] = beach.images;
      generalInfo['nombre_alternativo'] = beach.nombre_alternativo;
      generalInfo['nombre_alternativo_2'] = beach.nombre_alternativo_2;

      setNearbyBeaches(nearbyBeaches);
      setGeneralInfo(generalInfo);
      setBeach(beach);
      if (beach.bandera_azul === 'Sí') {
        setColorSchema({ backgroundColor: '#074c82', color: '#fff' });
        setIsBlueFlag(true);
      } else {
        setColorSchema({ backgroundColor: '#FABC3D', color: '#000' })
        setIsBlueFlag(false);
      }
      setCity(beach.termino_municipal);
    }
    
    

  }, [beachesList, props.location.search]);
 
  let content = null;
  if (beach) {
    if (generalInfo) {
      content = (
        <React.Fragment>
          <Header
            colorSchema={colorSchema}
            name={beach.nombre}
            isBlueFlag={isBlueFlag}
          />
            
          <Presentation
            colorSchema={colorSchema}
            generalInfo={generalInfo} />
            
          <div className={classes.sectionRoot}>
            <Title colorSchema={colorSchema} name="Weather & Forecast" />
            <Weather
              isBlueFlag={isBlueFlag}
              city={city} />
          </div>
          <div className={classes.sectionRoot}>
            <Title colorSchema={colorSchema} name="Features" />
            <Facilities beach={beach}/>
          </div>
          <div className={classes.sectionRoot}>
            <Title colorSchema={colorSchema} name="Services" />
            <Services beach={beach} />
          </div>
          <div className={classes.sectionRoot}>
            <Title colorSchema={colorSchema} name="Location and 15Km nearby beaches" />
            <Location
              isBlueFlag={isBlueFlag}
              nearbyBeaches={nearbyBeaches}
            />
          </div>
        </React.Fragment>
      )
    }
  }
  return (
     <div className={classes.root}> 
      {content}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    beachesList: state.beaches.beachesList
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onSetCountryBeaches: (route) => dispatch(actionsBeaches.setCountryBeaches(route)),
    onSetReturnFromDetails: (value) => dispatch(actionsMapFilters.setReturnFromDetails(value))
  }
};

BeachDetails.propTypes = {
  beachesList: PropTypes.arrayOf(
    PropTypes.shape(BeachObject)
  ).isRequired,
  onSetCountryBeaches: PropTypes.func.isRequired,
  onSetReturnFromDetails: PropTypes.func.isRequired
}

export default (connect(mapStateToProps, mapDispatchToProps)(BeachDetails): React.AbstractComponent<OwnProps>);