import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps";


const MyGoogleMap = compose(
  withProps({
    
  
    googleMapURL:"https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBzE15BZUN0Xhhx0OzkMKNlaII7QX4p6GU",
    loadingElement:<div style={{ height: '100%' }} />,
    containerElement:<div style = {{ height: '400px' }} />,
    mapElement:< div style = {{ height: '100%' }} />
  }),
  withStateHandlers(() => ({
    isOpen: true,
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
  withScriptjs,
  withGoogleMap
)(props =>
    <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.coordinates.lat, lng: props.coordinates.lng }}
  >
    <Marker
      position={{ lat: props.coordinates.lat, lng: props.coordinates.lng }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <span style={{fontSize: '1.5rem', color: '#444',fontWeight: 700}}>{props.nombre}</span>
      </InfoWindow>}
    </Marker>


  </GoogleMap >
);

export default MyGoogleMap;