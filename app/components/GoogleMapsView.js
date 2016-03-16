import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

class ShelterMap extends React.Component {

  render() {
    return (
      <div className="map" style={{ height: '300px', border: '1px black solid' }}>
         <GoogleMapLoader
           ref={(map) => { console.log(map); }}
           containerElement={ <div style={{ height: '100%' }} /> }
           googleMapElement={
            <GoogleMap defaultZoom={14} defaultCenter={{ lat: 30.2672, lng: -97.7431 }}>
            </GoogleMap>
          }
         />
         </div>
      );
  }
}

export default ShelterMap;
