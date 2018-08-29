import React from 'react'
import PropTypes from 'prop-types'

export default class LocationList extends React.Component {

     // Ensure we receive the properties as expected
    static propTypes = {
        locations: PropTypes.array.isRequired,
        searchLocation: PropTypes.func.isRequired,
        selectLocation: PropTypes.func.isRequired
    }

    render() {

      // declaration for easy read and maintain
      const { locations, searchLocation, selectLocation } = this.props;
      return (
        <div id="container" tabIndex="-1">
          <input
            autoFocus
            tabIndex="0"
            id="location-input"
            type="text"
            placeholder="Search Restaurants"
            aria-label="Search Input Box"
            role="listitem"
            onChange={(event) => searchLocation(event.target.value)}/>

          <div tabIndex="-1"
            className="user-selected-item-container user-selected-item-container-responsive">
            { locations.map((location) => (
              <div
                onKeyPress={selectLocation.bind(this, location)}
                aria-label={"Restaurant Name - " + location.title}
                key={location.title}
                className="user-selected"
                tabIndex="0"
                onClick={selectLocation.bind(this, location)} > {location.title}
              </div>
            ))
            }
          </div>
        </div>
      )
    }
  }
