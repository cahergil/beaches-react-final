import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';

import MyGoogleMap from './GoogleMap/MyGoogleMap';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  root: {

  }
})

const Location = props => {
  const classes = useStyles();
 
  const { nearbyBeaches, isBlueFlag, history } = props;
  return (
    <section className={classes.root}>
      <MyGoogleMap
        nearbyBeaches={nearbyBeaches}
        isBlueFlag={isBlueFlag}
        history={history}
      />
    </section>
  );
};

Location.propTypes = {
  nearbyBeaches: PropTypes.arrayOf(
    PropTypes.shape({
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired 
    })
  ).isRequired,
  isBlueFlag: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Location);