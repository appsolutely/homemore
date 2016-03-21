import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class ShelterMap extends React.Component {

  render() {
    const location = this.props.shelters;
    const markers = [{
      position: {
        lat: location.lat,
        lng: location.lng,
      },
      defaultAnimation: 2,
    }];
    return (
      <div className="map" style={{ height: '300px', border: '1px black solid' }}>
         <GoogleMapLoader
           containerElement={ <div style={{ height: '100%' }} /> }
           googleMapElement={
            <GoogleMap
              defaultZoom={18}
              defaultCenter={ location }
            >
            { markers.map((marker) => {
              return (
                 <Marker
                   {...marker}
                 />
               );
            })};
            </GoogleMap>
          }
         />
         </div>
      );
  }
}

ShelterMap.propTypes = {
  shelters: React.PropTypes.object,
};

export default ShelterMap;
