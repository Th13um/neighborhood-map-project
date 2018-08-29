import React, { Component } from 'react'
import DataLocations from './data/Locations.json'
import LocationList from './components/LocationList'
import './App.css'

export const FacebookAccessToken = 'EAADzKK0H2DUBAKgWDjSLKAJJ33gs8Gz21hGrw3CpV8LZBE8CjrS62zhBkcY35yiNc0P8i11CTTYHlCdre2p1LKGoYDoB9BYGoaSdTXJPJSl2DeMWNceq7hZBZBtMSZBhDMFYrhltt8ApWD74tLOlZC62CO3KgDpCdlqBtcPZBLMwgtQsOSQ4QLxbx3CV44fGoZD'
export const GoogleMapAPIKey = 'AIzaSyCWxhujtEkLYQauF0fHdEbrvHT_U3ZDRSE'

class App extends Component {

  state = {
    locations: DataLocations
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
    initJS('https://maps.googleapis.com/maps/api/js?key=' + GoogleMapAPIKey + '&callback=loadMap')
  }


  //initialize map
  loadMap() {

    const self = this;
    const mapView = document.getElementById('mapContainer');

    mapView.style.height = window.innerHeight + "px";

    const map = new window.google.maps.Map(mapView, {
      center: { lat: 48.864716, lng: 2.349014 },
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeId.ROAD,
        position: window.google.maps.ControlPosition.LEFT_BOTTOM
      },
      mapTypeControl: false
    });

    this.map = map;
    this.FacebookInfoWindow = new window.google.maps.InfoWindow();

    //Set the Bounds of the Map to the Locations
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
      title: location.title,
      animation: window.google.maps.Animation.BOUNCE,
      facebookID: location.id
    })

    marker.addListener('click', function () {
      self.populateInfoWindow(this, self.FacebookInfoWindow)
    })

    return marker
  }


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
      })
    }
    // Get data about the Markers from the Facebook API
    const URL_REQ = "https://graph.facebook.com/"
     + marker.facebookID
     + "?fields=id,name,location,about,website&access_token="
     + FacebookAccessToken;

   const getFacebookGraphAPI = () =>
     fetch(URL_REQ, {})
       .then(res => res.json())
       .then(data => data)

   getFacebookGraphAPI().then((response) => {

     infowindow.setContent('<div>' +
       '<div><strong>Name:</strong> ' + response.name + '</div>' +
       '<div><strong>Address: </strong> ' + response.street + '</div>' +
       '<div><strong>Description: </strong> ' + response.about + ' </div>' +
       '<p><em> Data courtesy of Facebook Graph API </em></p>' +
       '</div>')

   })

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

        <LocationList
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
