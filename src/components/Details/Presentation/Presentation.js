import React from 'react';
import { makeStyles } from '@material-ui/core';


import Gallery from './Gallery/Gallery';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Description from './Description/Description';

// const infoWidth = 35;
// const galleryWith = 
const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    // gridTemplateColumns: `${infoWidth}% (100 - ${infoWidth})%`,
    gridTemplateColumns: '35% 65%',
    gridTemplateRows: 'repeat(2, min-content)'
    // gridColumnGap: '3rem'
  }
})

const Presentation = props => {
  const classes = useStyles();
  const { generalInfo } = props;

  return (
    <section className={classes.root}>
      <GeneralInfo generalInfo={generalInfo}/>
      <Gallery images={generalInfo.images}/>
      <Description description={generalInfo.descripcion}/>
    </section>
  );
}

export default Presentation;