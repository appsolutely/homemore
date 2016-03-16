import React from 'react';
import alt from '../alt';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';



export default function SimpleMap (props) {
  return (
   <div className="maps">
                  <GoogleMapLoader
                    containerElement={
                      <div
                        style={{
                          height: '100%',
                        }}
                      />
                    }
                    googleMapElement={
                      <GoogleMap
                        ref = {(map) => { console.log(map);}}
                        defaultZoom={3}
                        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}>
                        </GoogleMap>
                    }
                  />
                  Map Goes Here
                </div>
  )
};
