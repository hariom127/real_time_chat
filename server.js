const express = require('express')
const app = express()
const result = require('dotenv').config()
const http = require('http')
const { Server } = require('socket.io')

const port = process.env.PORT || 8000

const server = http.createServer(app)
server.listen(port, function (req, res) {
  console.log('listening on port', port)
})
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected')

  // listen clien event
  socket.on('sendMsg', (msg) => {
    console.log('msg', msg)
    // send msg to reciver clients
    socket.broadcast.emit('receiveMsg', msg)
  })
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
