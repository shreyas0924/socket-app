import express, { Application, Request, Response } from 'express'

const app: Application = express()

const port: number = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`)
})

const http = require('http').Server(app)

const server = http.listen(3001, function () {
  console.log('server listening on *:3001')
})
server.on("connection" , () => {
    console.log("client connected")
})
