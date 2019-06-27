import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {

  }
})

const Location = props => {
  const classes = useStyles();

  return (
      <section className={classes.root}>Location</section>
  );
}

export default Location;