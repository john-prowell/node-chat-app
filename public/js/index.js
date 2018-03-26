var socket = io();
    socket.on('connect', () => { // when server connects
      console.log('Connected to Server'); 

      socket.emit('createMessage', {  // emit message
        from: 'Andrew',
        text: 'Yup, that works for me'
      });
      
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Server');
    });

     socket.on('newMessage', (message) => {
      console.log('newMessage', message);
    });
