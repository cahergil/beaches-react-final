// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';

import MyGoogleMap from './GoogleMap/MyGoogleMap';
import type { NearbyBeach } from '../../Model/NearbyBeach';

type Props = {
  nearbyBeaches: Array<NearbyBeach>,
  isBlueFlag: boolean,
  history: RouterHistory
}
const Location = ({nearbyBeaches, isBlueFlag, history}: Props) => {
  return (
    <section>
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