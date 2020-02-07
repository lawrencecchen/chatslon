const socket = io.connect('https://chatslon.herokuapp.com/');

//https://serverjs.io/tutorials/chat/
var user = cookie.get("user");
if (!user) {
  // Ask for the username if there is none set already
  user = prompt("Choose a username:");
  if (!user) {
    alert("Choose a username and follow directions you low-wattage bulb");
  } else {
    // Store it in the cookies for future use
    cookie.set("user", user);
  }
}

//join/leave
socket.on("check connection", (data) => {
  console.log(data);
})

socket.on("count", function(data) {
  $(".user-count").html(data);
});

//message
socket.on("new message", (data) => {
  console.log(data);
  addChatMessage(data);
});

//when form submit
$("#send").click(function(e) {
  //retrieve message from user
  let message = $("#chatbox").val();
  //send message to server
  socket.emit("new message", {
    username: cookie.get("user") || "Anonymous",
    message: message
  });
  
  $("#chatbox").val("");
  $("#chatbox").focus();
});

function addChatMessage(data) {
  $("#messages").append(
    "<p><strong>" + data.username + "</strong>: " + data.message + "</p>"
  );
}
