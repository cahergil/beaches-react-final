
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    fontSize: '1.8rem',
    // borderBottom: '1px dotted #ddd',
    backgroundColor: '#bbb',
    // backgroundColor: props => props.colorSchema.backgroundColor,
    color: '#444',
    // color: props => props.colorSchema.color,
    padding: '1rem'
    
  }
}))

const SectionTitle = (props) => {
  const {  name } = props;
  const classes = useStyles(props);

  return (
    <section className={classes.root}>{name}</section>
  );
}

export default SectionTitle;