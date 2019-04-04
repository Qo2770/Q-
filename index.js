const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

// Create App
let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/app')));

// Set Port
app.set('port', (process.env.PORT || 5000));

// Pusher
const pusher_config = require('./secrets.js');
var pusher = new Pusher(pusher_config);


// ** Routes **

app.get('/api/data', (req,res) => {

});

app.post('/api/data/add', (req, res) => {

});

// Start Server

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
