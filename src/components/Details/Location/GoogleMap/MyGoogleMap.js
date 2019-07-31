import React from 'react';
import { compose, withProps, lifecycle, withState, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps";

// import mapMarkerIcon from '../../../../assets/images/nbpin.png'
// import mapMarkerBlueFlagIcon from '../../../../assets/images/bfpin.png'
import iconnbf from '../../../../assets/images/nbpin.svg';
import iconbf from '../../../../assets/images/bfpin.svg';
const MyGoogleMap = compose(
  withProps({
    
  
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBzE15BZUN0Xhhx0OzkMKNlaII7QX4p6GU",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: < div style={{ height: '100%' }} />
  }),
  withState('places', 'updatePlaces', ''),
  withState('selectedPlace', 'updateSelectedPlace', 0),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }
    const beaches = {
      nearbyBeaches: undefined
    }
    return {
      onMapMounted: (beaches) => ref => {
        refs.map = ref;
        beaches.nearbyBeaches = beaches;
      }, 
      onToggleOpen: ({ updateSelectedPlace }) => key => {
        updateSelectedPlace(key);
      },
      onTilesLoaded: () => {
        const bounds = new window.google.maps.LatLngBounds()
        beaches.nearbyBeaches.map((beach, i) => {
          bounds.extend(new window.google.maps.LatLng(
            beach.lat,
            beach.lng
          ));
        });
        refs.map.fitBounds(bounds)
      }
    }
  }),
  
  withScriptjs,
  withGoogleMap,
  lifecycle({

    componentDidUpdate(prevProps, prevState) {
      console.log('map updated');

      // const bounds = new window.google.maps.LatLngBounds()
      // this.props.nearbyBeaches.map((beach, i) => {
      //   bounds.extend(new window.google.maps.LatLng(
      //     beach.lat,
      //     beach.lng
      //   ));
      // });
      // this.refs.map.fitBounds(bounds)
    },
    componentWillMount() {
      console.log('map willmount');
     
      
      
      // this.setState({

      //   zoomToMarkers: map => {
      //     //console.log("Zoom to markers");
      //     const bounds = new window.google.maps.LatLngBounds();
      //     if(!map) { return}
      //     map.props.children.forEach((child) => {
      //       if (child.type === Marker) {
      //         // console.log('marker', ++count)
      //         bounds.extend(new window.google.maps.LatLng(child.props.position.lat, child.props.position.lng));
      //       }
      //     })
      //     map.fitBounds(bounds);
      //   }
      // })
    },
  }),
)(props =>
  <GoogleMap
    options={{ scaleControl: true }}
    // ref={props.zoomToMarkers}
    ref={props.onMapMounted(props.nearbyBeaches)}
    defaultZoom={12}
    onTilesLoaded={props.onTilesLoaded}
    defaultCenter={{ lat: props.nearbyBeaches[0].lat, lng: props.nearbyBeaches[0].lng }}
    >
    {props.nearbyBeaches && props.nearbyBeaches.map((nearbyBeach, index) => (
      <Marker
        // icon={(index === 0 && props.isBlueFlag) ? iconbf : (index === 0 && !props.isBlueFlag) ? iconnbf: null }
        icon={index === 0 ? iconnbf : null}
        key={index}
        position={{ lat: nearbyBeach.lat, lng: nearbyBeach.lng }}
        onClick={() => props.onToggleOpen(index)}
        >
        { props.selectedPlace === index &&
            <InfoWindow onCloseClick={props.onToggleOpen}>
            <span onClick={() => props.history.push({
              pathname: '/details/beach',
              search: `?id=${nearbyBeach.id}`
              })}  style={{cursor: 'pointer', fontSize: '1.5rem', color: '#444', fontWeight: 700 }}>
              Go &nbsp;
              {props.nearbyBeaches[props.selectedPlace].name}
              </span>
            </InfoWindow>
            
         }
          
        </Marker>

      ))}
 
  </GoogleMap >
);

export default MyGoogleMap;