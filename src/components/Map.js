import React from 'react'
import PropTypes from 'prop-types'
 export default class Map extends React.Component {
     // Ensure we receive the properties as expected
    static propTypes = {
        locations: PropTypes.array.isRequired,
        searchLocation: PropTypes.func.isRequired
    }
     render() {
         // declaration for easy read and maintain
        const { locations, searchLocation } = this.props;
         return (
             <div id="container">
                <div>
                    <input
                        id="location-input"
                        type="text"
                        placeholder="Search Monument"
                        onChange={(event) => searchLocation(event.target.value)} />
                </div>
                 <div className="user-selected-item-container user-selected-item-container-responsive">
                    {
                        locations.map((location) => (
                             <div
                                key={location.title}
                                className="user-selected control">
                            </div>
                        ))
                    }
                </div>
             </div>
        )
    }
}
