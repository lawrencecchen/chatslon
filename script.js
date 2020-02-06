//https://serverjs.io/tutorials/chat/
var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('Choose a username:');
  if (!user) {
    alert('Choose a username and follow directions you low-wattage bulb');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}

var socket = io();

//join/leave
socket.on('count', function (data) {
  $('.user-count').html(data);
});

//message
socket.on('messages', function (data) {
  console.log(data);
  $('#messages').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

//when form submit
$('#send').click(function (e) {  
  //retrieve message from user
  let message = $('#chatbox').val();
  //send message to server
  socket.emit('message', {
    user: cookie.get('user') || 'Anonymous',
    message: message
  });

  $('#chatbox').val("");
  $('#chatbox').focus();
});
