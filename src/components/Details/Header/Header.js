import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
    fontSize: '4rem',
    opacity: '0.87'
  }
})

const Header = ({name}) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>{name}</section>
  );
}

export default Header;