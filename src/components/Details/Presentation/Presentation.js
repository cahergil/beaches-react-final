import React from 'react';
import { makeStyles } from '@material-ui/core';


import Gallery from './Gallery/Gallery';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Description from './Description/Description';
import Title from '../Title/Title';

// const infoWidth = 35;
// const galleryWith = 
const useStyles = makeStyles(theme =>({
  root: {
    width: '100%',
    display: 'grid',
    // gridTemplateColumns: `${infoWidth}% (100 - ${infoWidth})%`,
    gridTemplateColumns: '34% 64%',
    gridTemplateRows: 'repeat(2, min-content)',
    gridColumnGap: '2%',
    [theme.breakpoints.down(800)]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'repeat(3,min-content)',
      gridColumnGap: '0rem',
      gridRowGap: '2rem'
    }
  },
  sectionRoot: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(2, min-content)',
    // gridRowGap: '2rem',
    // padding: '1rem',
    boxShadow: '2px 1px 5px #ccc',
    borderRadius: '5px',
    overflow: 'hidden'
  }
}))

const Presentation = props => {
  const classes = useStyles();
  const { generalInfo, colorSchema } = props;

  return (
    <section className={classes.root}>
      <div className={classes.sectionRoot}>
        <Title colorSchema={colorSchema} name="General information"/>
        <GeneralInfo generalInfo={generalInfo}/>
      </div>
      <div className={classes.sectionRoot}>
        <Title colorSchema={colorSchema} name="Photo gallery" />
        <Gallery images={generalInfo.images} />
      </div>
     
        
      <Description colorSchema={colorSchema} description={generalInfo.descripcion}/>
      
    </section>
  );
}

export default Presentation;