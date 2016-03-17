import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

class ShelterMap extends React.Component {

  render() {
    const theShelter = this.props.shelters;
    return (
      <div className="map" style={{ height: '300px', border: '1px black solid' }}>
         <GoogleMapLoader
           ref={(map) => { console.log(map); }}
           containerElement={ <div style={{ height: '100%' }} /> }
           googleMapElement={
            <GoogleMap
              defaultZoom={18}
              defaultCenter={{ lat: theShelter.lat, lng: theShelter.long }}
            />
          }
         />
         </div>
      );
  }
}

ShelterMap.propTypes = {
  shelters: React.PropTypes.array,
};

export default ShelterMap;
