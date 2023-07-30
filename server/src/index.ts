import express, { Application, Request, Response } from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'

const app: Application = express()
const port: number = 4000

app.use(cors()) // Enable CORS for all routes

const httpServer = createServer(app)
const io = new Server(httpServer)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

io.on('connection', (socket: Socket) => {
  console.log('A client connected!')

  socket.on('textChange', (text: string) => {
    io.emit('textChange', text)
  })

  socket.on('disconnect', () => {
    console.log('A client disconnected!')
  })
})

httpServer.listen(port, () => {
  console.log(`App is listening on port ${port}!`)
})
