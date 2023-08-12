const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT'],
  },
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  //   socket.on('join-room', (data) => {
  //     socket.join(data)
  //   })

  //   socket.on('send-message', (data) => {
  //     socket.to(data.room).emit('receive-message', data)
  //   })
  socket.on('send-doc', (data) => {
    socket.broadcast.emit('receive-doc', data)
    // socket.to(data.room).emit('receive-doc', data)
  })

  socket.on('canvasData', (data) => {
    socket.broadcast.emit('receive-canvas', { text: data })
    console.log(`Received canvas data: ${data}`)
  })
})

server.listen(3000, () => {
  console.log('Server running')
})
