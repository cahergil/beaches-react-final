import React, { useState,useEffect } from 'react';
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

const useStyles = makeStyles({
  root: {
    with: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(4, min-content)',
    gridRowGap: '2rem',
    margin: '2rem'
  },
  sectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, min-content)',
    boxShadow: '2px 1px 5px #ccc',
    borderRadius: '5px',
    overflow: 'hidden'
  }
});

const BeachDetails = props => {
  const { beachesList, onSetCountryBeaches, onSetReturnFromDetails } = props;
  const [beach, setBeach] = useState(null);
  const [colorSchema, setColorSchema] = useState({ backgroundColor:'#FABC3D', color:'#000'})
  const [generalInfo, setGeneralInfo] = useState(null);
  const classes = useStyles();
  
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
    // console.log('id', id.trim());
    // console.log(typeof id);
    const beach = beachesList.find(beach => beach.id === id);
    // console.log(beach);
    const generalInfo = {};
    if (beach) {
      
      generalInfo['termino_municipal'] = beach.termino_municipal;
      generalInfo['provincia'] = beach.provincia;
      generalInfo['comunidad_autonoma'] = beach.comunidad_autonoma;
      generalInfo['longitud'] = beach.longitud;
      generalInfo['anchura'] = beach.anchura;
      generalInfo['grado_ocupacion'] = beach.grado_ocupacion;
      generalInfo['paseo_maritimo'] = beach.paseo_maritimo;
      generalInfo['descripcion'] = beach.descripcion;
      generalInfo['images'] = beach.images;
      setGeneralInfo(generalInfo);
      setBeach(beach);
      if (beach.bandera_azul === 'Sí') {
        setColorSchema({ backgroundColor: '#074c82', color: '#fff' });
      } 
    }
    
    

  }, [beachesList, props.location.search]);

  let content = null;
  if (beach) {
    if (generalInfo) {
      content = (
        <React.Fragment>
          <Header
            colorSchema={colorSchema}
            name={beach.nombre} />
          <Presentation
            colorSchema={colorSchema}
            generalInfo={generalInfo} />
          <div className={classes.sectionRoot}>
            <Title colorSchema={colorSchema} name="Features" />
            <Facilities />
          </div>
          <div className={classes.sectionRoot}>
            <Title colorSchema={colorSchema} name="Services" />
            <Services beach={beach} />
          </div>
          <div className={classes.sectionRoot}>
            <Title colorSchema={colorSchema} name="Location" />
            <Location beach={beach}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(BeachDetails);