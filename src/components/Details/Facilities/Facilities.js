import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {

  }
})

const Facilities = props => {
  const classes = useStyles();

  return (
      <section className={classes.root}>Facilities</section>
  );
}

export default Facilities;