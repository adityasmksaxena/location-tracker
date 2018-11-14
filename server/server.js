const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());

const Location = {
  device1: [
    { lat: '28.4909728', long: '77.0806468' },
    { lat: '28.4917986', long: '77.0816072' },
    { lat: '28.4927009', long: '77.0825111' },
    { lat: '28.4942424', long: '77.083984' },
    { lat: '28.495340', long: '77.083435' },
    { lat: '28.497469', long: '77.080552' },
  ],
  device2: [{ lat: '28.4917986', long: '77.0816072' }],
  device3: [{ lat: '28.502321', long: '77.070823' }],
};
// Location Related Routes
app.get('/location', async (req, res) => {
  const response = Object.keys(Location).map(key => ({ [key]: Location[key][0] }));
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

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.export = app;
