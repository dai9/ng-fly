var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var drone = require('./models/drone');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.io = io;

// require('dronestream').listen(server);

// SOCKETS

io.on('connection', function(socket) {
  console.log(`${socket.id} has connected.`);
  socket.on('message', function(message) {
    if (message.isCommand) {
      drone.command(message.body);
    }
    io.emit('message', message);
  });
  socket.on('command', function(command) {
    drone.command(command);
  });
  socket.on('disconnect', function() {
    console.log(`${socket.id} has disconnected.`);
  });
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/libs',express.static(path.join(__dirname, '../libs')));
app.use('/assets',express.static(path.join(__dirname, '../assets')));
app.use('/dist',express.static(path.join(__dirname, '../client/dist')));
app.use('/js',express.static(path.join(__dirname, '../client/src/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/src/js/templates')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

module.exports = app;
