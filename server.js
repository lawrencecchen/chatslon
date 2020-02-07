// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// const listener = app.listen(process.env.PORT, function() {
//   console.log("Your app is listening on port " + listener.address().port);
// });

server.listen(process.env.PORT);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/app/index.html");
});

io.on('connection', (socket) => {
  socket.emit('check connection', {
    message: "Connected to socks..."
  });
  
  socket.on('new message', (data) => {
    console.log(data);
    const message = data.message;
    const username = data.username;
    
    socket.emit('new message', {
      username: username,
      message: message
    });
  });
})
