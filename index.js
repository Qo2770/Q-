const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

// MongoDB and Mongoose
const mongoose = require('mongoose');

const db_url = 'mongodb://localhost:27017/';
const db_name = 'test';
mongoose.connect(db_url + db_name, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// Mongoose Schemas
const temperatureFormat = require('./schemas/temperature.js');
const imagesFormat = require('./schemas/images.js');
var temperatureSchema = new mongoose.Schema(temperatureFormat);
var imagesSchema = new mongoose.Schema(imagesFormat);

var Temperature = mongoose.model("Temperature", temperatureSchema);
var Images = mongoose.model("Images", imagesSchema);

// Create App
let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Port
app.set('port', (process.env.PORT || 5000));

// Pusher
const pusher_config = require('./secrets.js');
var pusher = new Pusher(pusher_config);


// ** Routes **

app.get('/api/data', (req,res) => {

});

app.post('/api/data/add', (req, res) => {
  console.log(req.body.sensor);

  let sensorData;

  let timeData = req.body.time;

  if(req.body.sensor === "temperature") {

    // Temperature and Humidity

    let temperatureData = Number(req.body.data[0]) || null;
    let humidityData = Number(req.body.data[1]) || null;

    sensorData = new Temperature({time: timeData, temperature: temperatureData, humidity: humidityData});

  } else {

    // Image

    let imageData = req.body.data;

    sensorData = new Images({time: timeData, file: imageData});

  }

  sensorData.save( err => {
    if (err)
      return res.status(500).send(err);
    else
      return res.status(200).send(sensorData);
  });

});

// Start Server

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
