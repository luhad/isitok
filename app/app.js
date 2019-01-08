// requires
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const middleware = require("./back/components/middleware")
const routes = require("./back/routes")
const path = require("path")

// express
const app = express()

// server
const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

// db
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

// middlewares
app.use((req, res, next) => {
  middleware.defaultHeader(req, res)
  req.method == 'OPTIONS' ? res.sendStatus(204) : next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('static'));

// socket
const io = require('socket.io')(server);

// set socket.io listeners.
io.on('connection', (socket) => {
  // once a client has connected, emitt a 'room' event asking to join this particular room
  socket.on('letMeJoinThisRoom', function (room) {
    socket.join(room);
  });

  socket.on('disconnect', () => { });
});

// setup socket.io
app.use(function (req, res, next) {
  req.io = io
  next()
})

// routing
app.use('/api', routes)

// socket test
app.use('/sockettest', express.static(path.join(__dirname, '/front/sockettest')))
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'sockettest', 'index.html'))
})

// front
app.use('/', express.static(path.join(__dirname, '/front/dist')))
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'front', 'index.html'))
})

