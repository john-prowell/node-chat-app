const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { // represents individual socket
  console.log('New User Connected');  // on connection

   // send message to only new socket connection - calls newMessage and sends from and text
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
   
  // send message to everyone but new socket connection
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // createMessage listener
  // createMessage called when form submitted
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();    
  });
 
  // createLocationMessage listener
  // createLocationMessage called and location coords passed in from user
  socket.on('createLocationMessage', (coords) => {
    console.log('createLocationMessage', coords);
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));    
  });

  // when user disconnects
  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
});

// PORT
server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});