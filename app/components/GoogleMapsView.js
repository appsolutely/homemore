import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

class ShelterMap extends React.Component {
 return (
     <GoogleMapLoader
     ref={(map) => console.log(map)}
     containerElement={ <div style={{ height: '70%' }} /> }
     googleMapElement={ <GoogleMap defaultZoom={14} defaultCenter={{ lat: 30.2672, lng: -97.7431 }}></GoogleMap> }
     />
    );
};

export default ShelterMap;
