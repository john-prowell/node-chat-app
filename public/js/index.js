var socket = io();
socket.on('connect', () => { // when server connects
  console.log('Connected to Server');            
});

socket.on('disconnect', () => { // server disconnects
  console.log('Disconnected from Server');
});

// When newMessage called
socket.on('newMessage', (message) => {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// When newLocationMessage called
socket.on('newLocationMessage', (message) => {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});


// Form message event listener
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', { // calls createMessage on server
    from: 'User',
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val('');
  });
});


// Send Location Button
var locationButton = jQuery('#send-location');
locationButton.on('click', () => {  
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', { // send to server
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
});