import React from 'react';
import { makeStyles } from '@material-ui/core';
import Title from './../../Title/Title';

const useStyles = makeStyles({
  root: {
    gridColumn: '1 / span 2',
    fontSize: '2rem',
    margin: '2rem',
    
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
})

const Description = props => {
  const { description,colorSchema } = props;
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.sectionRoot}>
        <Title colorSchema={colorSchema} name="Description" />
      {description}
      </div> 
    </section>
  );
}

export default Description;