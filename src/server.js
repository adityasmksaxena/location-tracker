const bodyParser = require('body-parser');
const express = require('express');
const { isProduction } = require('../util/util');
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const Location = {
  device1: [
    { lat: 28.4911392, lng: 77.0808899 },
    { lat: 28.4917986, lng: 77.0816072 },
    { lat: 28.4927009, lng: 77.0825111 },
    { lat: 28.4942424, lng: 77.083984 },
    { lat: 28.49534, lng: 77.083435 },
    { lat: 28.497469, lng: 77.080552 },
  ],
  device2: [{ lat: 28.436003, lng: 77.010262 }],
  device3: [{ lat: 28.502321, lng: 77.070823 }],
  device4: [{ lat: 28.414582, lng: 77.046207 }],
  device5: [{ lat: 28.449075, lng: 77.122213 }],
  device6: [{ lat: 28.516813, lng: 77.04595 }],
  device7: [{ lat: 28.437721, lng: 77.067514 }],
  device8: [{ lat: 28.449061, lng: 77.063736 }],
  device9: [{ lat: 28.477491, lng: 77.069802 }],
};
// Location Related Routes
app.get('/locations', async (req, res) => {
  lastDeviceId = null;
  const response = Object.keys(Location).reduce((acc, key) => {
    acc[key] = Location[key][0];
    return acc;
  }, {});
  res.send(response);
});

let i = 0;
let lastDeviceId = null;
app.get('/locations/:id', async (req, res) => {
  const { id } = req.params;
  const deviceLocationList = Location[id];
  if (deviceLocationList) {
    if (lastDeviceId !== id) i = 0;
    if (deviceLocationList.length > i) {
      // console.log(id, deviceLocationList, i);
      lastDeviceId = id;
      res.send(deviceLocationList[i]);
      i++;
    } else {
      // if (id === 'device4') res.send({status: 'offline'})
      res.send(deviceLocationList[i - 1]);
    }
  }
  res.status(404).send();
});

if (isProduction) {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    path.resolve(__dirname, 'client', 'build', 'index.html');
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.export = app;
