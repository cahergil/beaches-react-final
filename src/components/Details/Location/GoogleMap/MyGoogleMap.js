// @flow
import React, { useState, useEffect, useRef } from 'react';
import type { RouterHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'

import type { NearbyBeach } from '../../../Model/NearbyBeach';
import iconnbf from '../../../../assets/images/nbpin.svg';
import iconbf from '../../../../assets/images/bfpin.svg';

const useStyle = makeStyles({
  infoWindow: {
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: '#444',
    fontWeight: 700
  },
  go: {
    color: green[900],
    display: 'inline-block',
    margin: '1rem',
    '&:hover': {
      color: green[500]
    }
  }
  
})

type Props = {
  nearbyBeaches: Array<NearbyBeach>,
  isBlueFlag: boolean,
  history: RouterHistory
};

const MyGoogleMap = ({ nearbyBeaches, history, isBlueFlag }: Props) => {

  const [selectedPlace, setSelectedPlace] = useState(0);
  const refNewBeachesList = useRef(false);
  const [map, setMap] = useState(null);
  const classes = useStyle();

  const onToggleOpen = i => {
    setSelectedPlace(i);
  };

  useEffect(() => {
    // to recognize when a change is due to prop neabyBeaches
    refNewBeachesList.current = true;
    // so that starts showing the first item in nearbBeaches, which is always the
    // beach in details
    setSelectedPlace(0);
  }, [nearbyBeaches]);

  useEffect(() => {
    if (map) {
      if (!selectedPlace) {
        return;
      } else if (refNewBeachesList.current) {
        // to fitbounds
        refNewBeachesList.current = false;
        const bounds = new window.google.maps.LatLngBounds();
        // eslint-disable-next-line
        nearbyBeaches.map((beach, i) => {
          bounds.extend(new window.google.maps.LatLng(beach.lat, beach.lng));
        });
        map.fitBounds(bounds);
      } else {
        // to center map when clicking a marker
        // to avoid case when the next array is smaller than the current selectedPlace, test case: Dícido
        if (selectedPlace < nearbyBeaches.length) {
          map.panTo({
            lat: nearbyBeaches[selectedPlace].lat,
            lng: nearbyBeaches[selectedPlace].lng
          });
        }
      }
    }
  }, [map, selectedPlace, nearbyBeaches]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBzE15BZUN0Xhhx0OzkMKNlaII7QX4p6GU',
    language: 'en'
    // ...otherOptions
  });

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // const onResize = (map) => {
    //   console.log('onResize');
    //   onLoad(map);
    // }

    const onLoad = map => {
      const bounds = new window.google.maps.LatLngBounds();
      // eslint-disable-next-line
      nearbyBeaches.map((beach, i) => {
        bounds.extend(new window.google.maps.LatLng(beach.lat, beach.lng));
      });
      map.fitBounds(bounds);
      setMap(map);
    };
    // place here isLoaded to prevent 'google is not defined' error
    return (
      isLoaded && (
        <GoogleMap
          options={{ scaleControl: true }}
          mapContainerStyle={{
            height: '520px',
            width: '100%'
          }}
          zoom={12}
          onLoad={onLoad}
        >
          {nearbyBeaches &&
            nearbyBeaches.map((nearbyBeach, index) => (
              <Marker
                onLoad={marker => {}}
                icon={
                  index === 0 && isBlueFlag
                    ? iconbf
                    : index === 0 && !isBlueFlag
                    ? iconnbf
                    : null
                }
                key={index}
                position={{ lat: nearbyBeach.lat, lng: nearbyBeach.lng }}
                onClick={e => {
                  onToggleOpen(index);
                }}
              >
                {selectedPlace === index && (
                  <InfoWindow
                    onLoad={iw => {}}
                    onCloseClick={onToggleOpen}
                    position={{ lat: nearbyBeach.lat, lng: nearbyBeach.lng }}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -50)
                    }}
                    // anchor={{anchorPoint: }} anchor = new window.google.maps.Point(0, -52);
                  >
                    {/* use replace instead of push for being able to come back to map-spain page when clicking back */}
                    <div
                      className={classes.infoWindow}
                      onClick={() =>
                        history.replace({
                          pathname: '/details/beach',
                          search: `?id=${nearbyBeach.id}`
                        })
                      }
                    >
                      <span className={classes.go}>
                        {' '}
                        {nearbyBeaches[selectedPlace].name}
                      </span>{' '}
                      &nbsp;
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>
      )
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return renderMap();
  // return isLoaded ? renderMap() : <CircularProgress  color="secondary" size={60} />
};

export default MyGoogleMap;