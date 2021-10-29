const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const namedCurve = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// app.get('/chat', (req, res) => {
//   res.sendFile(__dirname + '/chat.html');
// })

// app.post('/', (req, res) => {
//   res.sendFile(__dirname + '/chat.html');
// })
io.on('connection', (socket) => {

  console.log('user connected')
  socket.emit('message', 'Welcome to Worldwide chatbox');

  socket.broadcast.emit('message', 'A user has joined this chatbox');

  socket.on('on-chat', data => {

    io.emit('user-chat', data)


  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has disconected this chatbox')
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
