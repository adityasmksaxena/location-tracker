import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      transform: 'translate(-50%, -50%)',
    }}
  >
    {text}
  </div>
);

class SampleMap extends Component {
  static defaultProps = {
    zoom: 9,
  };

  render() {
    const { devices, zoom = 15 } = this.props;
    const devicesKey = Object.keys(devices);
    const center = devices[devicesKey[0]];
    // const bound = new google.maps.LatLngBounds();
    // devicesKey.forEach(key => {
    //   const { lat, long } = devices[key];
    //   bound.extend(new google.maps.LatLng(lat, long));
    // });
    // const center = bound.getCenter();

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBsyaQRNIFEqP1QdeYmCb5UBtpiSABiQ0A' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {Object.keys(devices).map(key => {
            const { lat, lng } = devices[key];
            return <AnyReactComponent key={key} lat={lat} lng={lng} text={key} />;
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SampleMap;
