
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    fontSize: '2.5rem',
    borderBottom: '1px dotted #ddd',
    backgroundColor: props => props.colorSchema.backgroundColor,
    color: props => props.colorSchema.color,
    padding: '1rem'
    
  }
}))

const Title = (props) => {
  const {  name } = props;
  const classes = useStyles(props);

  return (
    <section className={classes.root}>{name}</section>
  );
}

export default Title;