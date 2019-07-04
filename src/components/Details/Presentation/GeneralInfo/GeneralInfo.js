import React from 'react';
import { makeStyles } from '@material-ui/core';

import * as utils from '../../../../Utils/Utils';
const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '35% 65%',
    gridTemplateRows: 'repeat(7, 3rem)',
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

const GeneralInfo = props => {
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
      </div>
    </section>
    
  );
}

export default GeneralInfo;