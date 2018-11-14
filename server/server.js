const bodyParser = require('body-parser');
const express = require('express');
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
  device2: [{ lat: 28.4917986, lng: 77.0816072 }],
  device3: [{ lat: 28.502321, lng: 77.070823 }],
};
// Location Related Routes
app.get('/location', async (req, res) => {
  const response = Object.keys(Location).reduce((acc, key) => {
    acc[key] = Location[key][0];
    return acc;
  }, {});
  res.send(response);
});

let i = 0;
let lastDeviceId = null;
app.get('/location/:id', async (req, res) => {
  const { id } = req.params;
  const device = Location[id];
  if (device) {
    if (lastDeviceId !== id) i = 0;
    res.send(device[i]);
    i++;
  }
  res.status(404).send();
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.export = app;
