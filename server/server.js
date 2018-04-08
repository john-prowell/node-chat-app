const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validate');
const {Users} = require('./utils/user');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => { // represents individual socket
  console.log('New User Connected');  // on connection
  
  socket.on('join', (params, callback) => { // receives params and err callback
    if (!isRealString(params.name) || !isRealString(params.room)) { // if params do not pass validation
      return callback('Name and Room Name are required.') // run callback with err message
    }

    socket.join(params.room); // send socket user to room requested in params
    users.removeUser(socket.id); // remove user if in another room
    users.addUser(socket.id, params.name, params.room); // then add them to new room
    
   // emit event to everyone in chatroom
   io.to(params.room).emit('updateUserList', users.getUserList(params.room));
   
   // send message to only new socket connection - calls newMessage and sends from and text
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
   // send message to everyone in room but new socket connection
   socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    
   callback(); // no errors passed back
  });

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
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
    console.log('User was Disconnected');
  });
});

// PORT
server.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});