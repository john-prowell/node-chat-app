const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { // represents individual socket
  console.log('New User Connected');  // on connection

   // send message to only new socket connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
   
  // send message to everyone but new socket connection
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the Server');
    // socket.broadcast.emit('newMessage', { // sends message to everyone connected except the one who created the event
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
})