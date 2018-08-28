import React, { Component } from 'react';
import DataLocations from './data/Locations.json'
import Map from './components/Map'


class App extends Component {

  state = {
    locations: []
  }

  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  componentDidMount() {
    this.setState({
      locations: DataLocations
    })

    window.loadMap = this.loadMap;
    initJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCWxhujtEkLYQauF0fHdEbrvHT_U3ZDRSE&callback=loadMap')
  }


  //initialize map
  loadMap() {

    const self = this;
    const mapView = document.getElementById('mapContainer');

    mapView.style.height = window.innerHeight + "px";

    const map = new window.google.maps.Map(mapView, {
      center: { lat: 48.864716, lng: 2.349014 }
    });

    this.map = map;
    this.FacebookInfoWindow = new window.google.maps.InfoWindow();

    // Set the Bounds of the Map to the Locations
    const bounds = new window.google.maps.LatLngBounds();

    // Create Markers
    this.state.locations.forEach((location) => {
      let myMarker = self.createMarker(location);
      bounds.extend(myMarker.position);
      location.marker = myMarker;
    });

    this.map.fitBounds(bounds);
  };


  //marker constructor
  createMarker(location) {

    const self = this

    const marker = new window.google.maps.Marker({
      position: {
        lat: location.location.lat,
        lng: location.location.lng
      },
      map: this.map,
      title: location.name,
      animation: window.google.maps.Animation.BOUNCE
    })

    marker.addListener('click', function () {
      self.populateInfoWindow(this, self.FacebookInfoWindow);
    });

    return marker
  };


  // Display Info Window with Data
  populateInfoWindow(marker, infowindow) {

    if (infowindow.marker !== marker) {

      // Center on clicked Marker
      this.map.panTo(new window.google.maps.LatLng(marker.position.lat(), marker.position.lng()))
      infowindow.marker = marker;

      // Displays message whilst Facebook Data is being retrieved
      infowindow.setContent('<div>Info</div>')
      infowindow.open(this.map, marker)

      // Event Listener - on Closing Window
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null
      });

    }

  }

  //Filter the list of locations
  searchLocation(query) {

    let self = this;

    if (query === '') {

      // If no location in search field, set Locations to all
      this.setState((state) => {
        return {
          locations: DataLocations
        }
      })

      DataLocations.filter(location => {
        return location.marker.setMap(self.map)
      })
    }
    else {

      //Search DataLocations for the query
      let SearchedLocations = DataLocations.filter(location => {

        if (location.marker) {
          if (location.title.toLowerCase().indexOf(query.toLowerCase().trim()) >= 0) {
            location.marker.setMap(self.map);
          } else {
            location.marker.setMap(null);
          }
        }
        return location.title.toLowerCase().indexOf(query.toLowerCase()) > -1
      }
    )

      // Set Locations
      this.setState((state) => {
        return {
          locations: SearchedLocations
        }
      })


    }
  }




  //Info for choosing location
  selectLocation(data) {
    this.populateInfoWindow(data.marker, this.FacebookInfoWindow)
  }



  render() {

    return (

      <div className="App">

        <div id="mapContainer"></div>

        <Map
          locations={this.state.locations}
          selectLocation={this.selectLocation}
          searchLocation={this.searchLocation} />

      </div>
    )
  }
}

export default App;


function initJS(src) {
  const ref = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
