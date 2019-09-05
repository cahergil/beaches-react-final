// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    fontSize: '1.8rem',
    backgroundColor: '#bbb',
    color: '#444',
    padding: '1rem'
    
  }
}))

type Props = {
  name: string
}

const SectionTitle = (props: Props) => {
  const {  name } = props;
  const classes = useStyles(props);

  return (
    <section className={classes.root}>{name}</section>
  );
}
SectionTitle.propTypes = {
  name: PropTypes.string.isRequired
}
export default SectionTitle;