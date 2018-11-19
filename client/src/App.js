import React, { Component, Fragment } from 'react';
import withRoot from './components/withRoot';
import { withStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import Marker from './components/Marker';
import GoogleMapReact from 'google-map-react';
import keys from './config/keys';

const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  places.forEach(place => {
    const { lat, lng } = place;
    bounds.extend(new maps.LatLng(lat, lng));
  });
  return bounds;
};

const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

const apiIsLoaded = (map, maps, places) => {
  if (map && maps) {
    const bounds = getMapBounds(map, maps, places);
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);
  }
};

class App extends Component {
  state = {
    locations: [],
    deviceList: [],
    selectedDevice: ' ',
  };

  updateDeviceLocation = async newLocations => {
    try {
      const { selectedDevice: device } = this.state;
      const location = await fetch(`http://localhost:5000/locations/${device}`).then(res =>
        res.json()
      );
      const stateLocations = this.state.locations;
      const locations = newLocations
        ? [location]
        : JSON.stringify(stateLocations[stateLocations.length - 1]) === JSON.stringify(location)
        ? stateLocations
        : [...stateLocations, location];
      // const center = location;
      // let zoom = locations.length === 1 ? 16 : 15;
      this.setState({
        locations,
        // center,
        // zoom,
      });
      apiIsLoaded(this.map, this.maps, locations);
    } catch (e) {
      console.error(e);
    }
  };

  handleDeviceSelection = async device => {
    clearInterval(this.interval);
    this.setState({ locations: [], selectedDevice: device }, () => {
      if (this.state.selectedDevice !== ' ') {
        this.updateDeviceLocation(true);
        const intervalTime = 3000;
        this.interval = setInterval(this.updateDeviceLocation, intervalTime);
      } else {
        this.getDevicesLocation();
      }
    });
  };

  getDevicesLocation = async () => {
    clearInterval(this.interval);
    try {
      const devicesLocationObj = await fetch('http://localhost:5000/locations').then(res =>
        res.json()
      );
      const deviceList = Object.keys(devicesLocationObj);
      const locations = deviceList.map(device => ({
        ...devicesLocationObj[device],
        device,
      }));
      const center = locations[0];
      this.setState({
        deviceList,
        locations,
        center,
      });
      apiIsLoaded(this.map, this.maps, locations);
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount() {
    this.getDevicesLocation();
  }

  render() {
    const { locations, deviceList, center, zoom = 9, selectedDevice } = this.state;
    if (!locations || !locations.length) return null;
    // const key =
    const markers = locations.map((place, i) => {
      const { lat, lng, device } = place;
      return (
        <Marker
          key={`${lat}${lng}`}
          lat={lat}
          lng={lng}
          curLocationMarker={selectedDevice !== ' ' && i === locations.length - 1}
          onClick={() => this.handleDeviceSelection(device)}
        />
      );
    });
    return (
      <Fragment>
        <header>
          <Header
            device={selectedDevice}
            deviceList={deviceList}
            handleDeviceSelection={this.handleDeviceSelection}
          />
        </header>
        <main>
          <div id="map">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: keys.GOOGLE_MAP_KEY,
              }}
              defaultZoom={9}
              zoom={zoom}
              center={center}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => {
                this.map = map;
                this.maps = maps;
                apiIsLoaded(map, maps, locations);
              }}
            >
              {markers}
            </GoogleMapReact>
          </div>
        </main>
      </Fragment>
    );
  }
}

const style = {};

export default withRoot(withStyles(style)(App));
