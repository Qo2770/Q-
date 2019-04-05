const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

// MongoDB and Mongoose
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

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

// Timestamp = 2018-07-29 09:17:13.812189
//             JJJJ-MM-DD HH:MM:SS.SSSSSS

// Get Image files and Temperature/Humidity Data
// Params: timeframe : if set to 'ALL', all records will be returned, not just the latest
app.get('/api/data', (req,res) => {

  // If all data is to be sent, set the param timeframe to ALL
  // Else, send the last 24 hours

  // Credit to chridam @ Stack Overflow
  var timestamp = new Date(Date.now() - 24 * 60 * 60 * 1000);
  var hexSeconds = Math.floor(timestamp/1000).toString(16);

  // Create an ObjectId with that hex timestamp
  var constructedObjectId = ObjectID(hexSeconds + "0000000000000000");
  Temperature.find({}, function(err, all) {
      Temperature.find({
          "_id": { "$gt" : constructedObjectId }
      }, function (err, latest) {
          res.json({data: latest});
          console.log("sent data: " + latest);
      });
  });
  // ---

});

// Post new Data
app.post('/api/data/add', (req, res) => {
  console.log(req.body.sensor);

  let sensorData;

  let timeData = Date.now();
  console.log(timeData);

  if(req.body.sensor === "temperature") {

    // Temperature and Humidity

    let temperatureData = Number(req.body.data[0]) || null;
    let humidityData = Number(req.body.data[1]) || null;

    sensorData = new Temperature({time: timeData, temperature: temperatureData, humidity: humidityData});

    pusher.trigger('data', 'new-temp-data', {
      newData: sensorData
    });

  } else {

    // Image

    let imageData = req.body.data;

    sensorData = new Images({time: timeData, file: imageData});

    pusher.trigger('data', 'new-img-data', {
      newData: sensorData
    });

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
