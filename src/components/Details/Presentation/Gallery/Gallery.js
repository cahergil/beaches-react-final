import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {

  }
})

const Gallery = props => {
  const classes = useStyles();

  return (
      <section className={classes.root}>Gallery</section>
  );
}

export default Gallery;