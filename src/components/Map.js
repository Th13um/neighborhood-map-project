import React, { Component } from 'react';
import DataLocations from '../data/Locations.json';
const { compose, withProps, withStateHandlers } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } = require( 'react-google-maps');

 class Map extends Component {

       render() {

           const ParisGoogleMap = compose(
               withStateHandlers(() => ({
                   isOpen: false,
               }), {
                       onToggleOpen: ({ isOpen }) => () => ({
                           isOpen: !isOpen,
                       })
                   }),
               withScriptjs,
               withGoogleMap
           )(props =>
               <GoogleMap
                   defaultCenter={{ lat: 48.864716, lng: 2.349014 }}
                   defaultZoom={12}
               >

                   {DataLocations.map((marker) =>

                       <Marker
                           name={marker.title}
                           onClick={props.onToggleOpen}
                           position={{ lat: marker.location.lat, lng: marker.location.lng }}
                           id={marker.id}
                       >
                           {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                               <div> info </div>
                           </InfoWindow>}

                       </Marker>

                   )}


               </GoogleMap>
           );

           return (
               <div>
                   <ParisGoogleMap
                       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWxhujtEkLYQauF0fHdEbrvHT_U3ZDRSE&v=3.exp&libraries=geometry,drawing,places"
                       loadingElement={<div style={{ height: `100%` }} />}
                       containerElement={<div style={{ height: `400px` }} />}
                       mapElement={<div style={{ height: `100%` }} />}
                       isMarkerShown={true}
                   />

               </div>
           );
       }
   };
export default Map;
