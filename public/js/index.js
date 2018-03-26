var socket = io();
    socket.on('connect', () => { // when server connects
      console.log('Connected to Server');            
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Server');
    });

     socket.on('newMessage', (message) => {
      console.log('newMessage', message);
    });
