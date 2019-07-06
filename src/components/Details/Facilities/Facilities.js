import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import SectionTitle from './Section/SectionTitle';
import * as utils from '../../../Utils/Utils';

import TranslateTextField from './../TranslateTextField';
import BeachObject from './../../Model/Model';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(50rem, 1fr))',
    gridColumnGap: '2rem',
    gridRowGap: '2rem',
    [theme.breakpoints.down(600)]: {
      gridTemplateColumns: '100%',
      gridColumnGap: '0rem',
    }
  },
  sectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, min-content)',
    boxShadow: '2px 1px 5px #ccc',
    overflow: 'hidden'
  },
  subsectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridRowGap: '2rem',
    justifyItems: 'left',
    padding: '1rem',
    fontSize: '1.5rem'
    
  },
  label: {
    opacity: '0.87'
  },
  text: {
    opacity: '0.6'
  }
}))

const Facilities = props => {
  const { beach } = props;
  const classes = useStyles();
 
  return (
    <section className={classes.root}>
      <div className={classes.sectionRoot}>
        <SectionTitle name="1. Type of beach" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Composition:</div>
          <div className={classes.text}>{utils.translateComposition(beach.composicion)}</div>
          <div className={classes.label}>Type of sand:</div>
          <div className={classes.text}>{utils.translateTypeOfSand(beach.tipo_de_arena)}</div>
          <div className={classes.label}>Bathing conditions:</div>
          <div className={classes.text}>{utils.translateBathingConditions(beach.condiciones_baño)}</div>
          <div className={classes.label}>Anchoring Area:</div>
          <div className={classes.text}>{utils.getYesNo(beach.zona_fondeo_balizada)}</div>
          <div className={classes.label}>Nudism:</div>
          <div className={classes.text}>{utils.getYesNo(beach.nudismo)}</div>

        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="2. Environmental aspects" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Vegetation:</div>
          <div className={classes.text}>{utils.getYesNo(beach.vegetacion)}</div>
          <div className={classes.label}>Protected area:</div>
          <div className={classes.text}>{utils.getYesNo(beach.espacio_protegido)}</div>
          <div className={classes.label}>Interventions:</div>
          <div className={classes.text}>{utils.getYesNo(beach.actuaciones)}</div>
          <div className={classes.label}>Blue flag:</div>
          <div className={classes.text}>{utils.getYesNo(beach.bandera_azul)}</div>
         

        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="3. Nearest hospital" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Name of hospital:</div>
          <div className={classes.text}>{beach.hospital}</div>
          <div className={classes.label}>Address:</div>
          <div className={classes.text}>{beach.direccion_hospital}</div>
          <div className={classes.label}>Telephone:</div>
          <div className={classes.text}>{beach.telefono_hospital}</div>
          <div className={classes.label}>Distance to hospital:</div>
          <div className={classes.text}>{beach.distancia_hospital}</div>
        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="4. Access" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Type of access:</div>
          <div className={classes.text}>{utils.translateTypeOfAccess(beach.forma_de_acceso)}</div>
          <div className={classes.label}>Access signage:</div>
          <div className={classes.text}>{utils.getYesNo(beach.señalizacion_accesos)}</div>
          <div className={classes.label}>Access to disabled persons:</div>
          <div className={classes.text}>{utils.getYesNo(beach.acceso_discapacitados)}</div>
          <div className={classes.label}>Coordinates:</div>
          <div className={classes.text}>lat:{beach.coordenada_y} / lng:{beach.coordenada_x} / H{beach.huso}</div>
          <div className={classes.label}>UTM coordinates:</div>
          <div className={classes.text}>{beach.coordenada_geografica_latitud} / {beach.coordenada_geografica_longitud}</div>

        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="5. Security" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Danger markers:</div>
          <div className={classes.text}>{utils.getYesNo(beach.señalizacion_peligro)}</div>
          <div className={classes.label}>Help and rescue:</div>
          <div className={classes.text}>{utils.getYesNo(beach.auxilio_y_salvamento)}</div>
         
        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="6. Transport" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Nearby road:</div>
          <div className={classes.text}>{utils.getYesNo(beach.carretera_mas_proxima)}</div>
          <div className={classes.label}>Bus:</div>
          <div className={classes.text}>{utils.getYesNo(beach.bus)}</div>
          <div className={classes.label}>Parking:</div>
          <div className={classes.text}>{utils.getYesNo(beach.aparcamiento)}</div>
         

        </div>
      </div>

      <div className={classes.sectionRoot}>
        <SectionTitle name="7. Pleasure harbour" />
        <div className={classes.subsectionRoot} >
          <div className={classes.label}>Harbour's name:</div>
          <div className={classes.text}>{utils.getYesNo(beach.puerto_deportivo)}</div>
          <div className={classes.label}>Distance to beach:</div>
          <div className={classes.text}>{utils.getYesNo(beach.distancia_puerto_deportivo)}</div>
          
        </div>
      </div>
      <div className={classes.sectionRoot}>
        <SectionTitle name="8. Observations" />
        <div style={{display: 'grid', gridTemplateColumns: '1fr', padding: '1rem', fontSize: '1.5rem', justifyItems: 'left'}} >
          {/* <div className={classes.text}>{utils.getYesNo(beach.observaciones)}</div> */}
          <TranslateTextField text={utils.toRemoveQuotes(beach.observaciones)}/>
                  
        </div>
      </div>
    </section>
  );
}

Facilities.propTypes = {
  beach: PropTypes.shape(BeachObject)
}
export default Facilities;