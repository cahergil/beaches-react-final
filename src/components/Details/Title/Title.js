// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes  from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    fontSize: '2rem',
    borderBottom: '1px dotted #ddd',
    backgroundColor: props => props.colorSchema.backgroundColor,
    color: props => props.colorSchema.color,
    padding: '1rem'
    
  }
}))
type Props = {
  colorSchema: {backgroundColor: string, color: string},
  name: string
}

const Title = (props: Props) => {
  const { name } = props;
  const classes = useStyles(props);

  return (
    <section className={classes.root}>{name}</section>
  );
};

Title.propTypes = {
  name: PropTypes.string.isRequired,
  colorSchema: PropTypes.shape({
    color: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
  }).isRequired
};

export default Title;