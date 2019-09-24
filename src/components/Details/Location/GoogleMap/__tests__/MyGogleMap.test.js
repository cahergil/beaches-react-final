import React from 'react';
import axios from 'axios';
import { useLoadScript } from '@react-google-maps/api'

import { customRenderWithRouter, waitForElement } from '../../../../../../tests/test-utils';
import MyGoogleMap from '../MyGoogleMap';
import { getDistance } from '../../../../../Utils/Utils'

jest.mock('@react-google-maps/api');

describe('test of GoolgeMap', () => {

  const refBeach = {
    "id": "1865",
    "nombre": "Antuerta",
    "coordenada_x": "-3,6196",
    "coordenada_y": "43,4966",

  }

  const defaultProps = {
    isBlueFlag: false,
    nearbyBeaches: []
  }
  beforeAll(async () => {
    let response = null;
    try {
      response = await axios.get('playas.json');

    } catch (error) {

    }
    const refBeachLatLng = {};
    refBeachLatLng['lat'] = parseFloat(refBeach.coordenada_y.replace(',', '.'));
    refBeachLatLng['lng'] = parseFloat(refBeach.coordenada_x.replace(',', '.'));
    const nearbyBeaches = [];
    // calculate 15Km nearby beaches
    response.data.forEach(element => {

      const beachLatLng = {}
      beachLatLng['lat'] = element.coordenada_y.replace(',', '.');
      beachLatLng['lng'] = element.coordenada_x.replace(',', '.');
      const distanceInMeters = getDistance(beachLatLng, refBeachLatLng);
      if (distanceInMeters < 15000) {
        // to not duplicate beach
        if (element.id !== refBeach.id && distanceInMeters !== 0) {
          nearbyBeaches.push({ name: element.nombre, lat: beachLatLng.lat, lng: beachLatLng.lng, id: element.id, distance: distanceInMeters })
        }
      }
    });

    defaultProps.nearbyBeaches = [...nearbyBeaches]

  })

  test('<MyGoogleMap /> renders ok', () => {
    const route = '/details/beach?id=1865&region=ES-CB';
    // everything is ok
    useLoadScript.mockReturnValue({ loadError: false, isLoaded: true });
    const { queryByTestId } = customRenderWithRouter(<MyGoogleMap {...defaultProps} />, route);
    expect(queryByTestId('google-map-loading-error')).toBeNull();
  });

  test('<MyGoogleMap /> renders error', async () => {
    const route = '/details/beach?id=1865&region=ES-CB';
    // include error
    useLoadScript.mockReturnValue({ loadError: true, isLoaded: false });
    const { getByTestId } = customRenderWithRouter(<MyGoogleMap {...defaultProps} />, route);
    const errorDiv = await waitForElement(() => getByTestId('google-map-loading-error'))
    expect(errorDiv).toBeInTheDocument()

  });

  // the library doesn't mount the map, no way to access the markers by data-testid
  test.skip('<MyGoogleMap /> renders nearby beaches', async () => {
    const route = '/details/beach?id=1865&region=ES-CB';
    useLoadScript.mockReturnValue({ loadError: false, isLoaded: true });
    const { getAllByTestId } = customRenderWithRouter(<MyGoogleMap {...defaultProps} />, route);
    const nearbyBeaches = await waitForElement(() => getAllByTestId('marker'));
    expect(nearbyBeaches.length).toBe(defaultProps.nearbyBeaches.length);

  });
});