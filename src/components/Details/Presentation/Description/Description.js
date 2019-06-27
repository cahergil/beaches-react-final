import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    gridColumn: '1 / span 2',
    fontSize: '2rem',
    margin: '2rem',
    opacity: '0.6'
  }
})

const Description = props => {
  const { description } = props;
  const classes = useStyles();

  return (
    <section className={classes.root}>{description}</section>
  );
}

export default Description;