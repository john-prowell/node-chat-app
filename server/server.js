const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { // represents individual socket
  console.log('New User Connected');  // on connection

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', { // sends message to everyone connected
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
})