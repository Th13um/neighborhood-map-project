import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

 class Map extends Component {

    render() {
         const ParisGoogleMap = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 48.864716, lng: 2.349014 }}
                defaultZoom={12}
            >
            </GoogleMap>
        ));
         return (
            <div>
                <ParisGoogleMap
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `500px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
};
export default Map;
