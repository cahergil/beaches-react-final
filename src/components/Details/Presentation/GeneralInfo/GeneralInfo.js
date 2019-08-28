// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types'

import * as utils from '../../../../Utils/Utils';
const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '35% 65%',
    gridTemplateRows: 'repeat(9, 3rem)',
    justifyItems: 'start',
    gridRowGap: '1.5rem',
    fontSize: '2rem',
    padding: '1rem'
  },
  label: {
    opacity: '0.87'
  },
  value: {
    opacity: '0.60'
  }
})
type Props = {
  generalInfo: {
    termino_municipal: string,
    provincia: string,
    comunidad_autonoma: string,
    longitud: string,
    anchura: string,
    grado_ocupacion: string,
    paseo_maritimo: string,
    descripcion: string,
    images: string,
    nombre_alternativo: string,
    nombre_alternativo_2: string
  }
};
const GeneralInfo = (props: Props) => {
  const { generalInfo } = props;
  const classes = useStyles();

  return (
    <section >
      <div className={classes.root}>
        <div className={classes.label}>Locality:</div>
        <div className={classes.value}>{generalInfo.termino_municipal}</div>
        <div className={classes.label}>Province:</div>
        <div className={classes.value}>{generalInfo.provincia}</div>
        <div className={classes.label}>Region:</div>
        <div className={classes.value}>{generalInfo.comunidad_autonoma}</div>
        <div className={classes.label}>Length:</div>
        <div className={classes.value}>{utils.translateMetros(generalInfo.longitud)}</div>
        <div className={classes.label}>Width:</div>
        <div className={classes.value}>{utils.translateMetros(generalInfo.anchura)}</div>
        <div className={classes.label}>Occupancy:</div>
        <div className={classes.value}>{utils.translateOcuppancy(generalInfo.grado_ocupacion)}</div>
        <div className={classes.label}>Promenade:</div>
        <div className={classes.value}>{utils.getYesNo(generalInfo.paseo_maritimo)}</div>
        <div className={classes.label}>Alt name 1:</div>
        <div className={classes.value}>{utils.getYesNo(generalInfo.nombre_alternativo)}</div>
        <div className={classes.label}>Alt name 2:</div>
        <div className={classes.value}>{utils.getYesNo(generalInfo.nombre_alternativo_2)}</div>
      </div>
    </section>
    
  );
}

GeneralInfo.propTypes = {
  generalInfo: PropTypes.shape({
    termino_municipal: PropTypes.string.isRequired,
    provincia: PropTypes.string.isRequired,
    comunidad_autonoma: PropTypes.string.isRequired,
    longitud: PropTypes.string.isRequired,
    anchura: PropTypes.string.isRequired,
    grado_ocupacion: PropTypes.string.isRequired,
    paseo_maritimo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired
  }).isRequired 
}

export default GeneralInfo;