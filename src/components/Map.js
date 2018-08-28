import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import DataLocations from '../data/Locations.json'

 class Map extends Component {

    render() {
         const ParisGoogleMap = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 48.864716, lng: 2.349014 }}
                defaultZoom={12}
            >
            {DataLocations.map((marker) =>
                       <Marker
                          name={marker.title}
                          position={{ lat: marker.location.lat, lng: marker.location.lng }}
                          id={marker.id}
                      >
                       </Marker>
                   )}
            </GoogleMap>
        ));
         return (
            <div>
                <ParisGoogleMap
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `500px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                isMarkerShown
                />
            </div>
        );
    }
};
export default Map;
