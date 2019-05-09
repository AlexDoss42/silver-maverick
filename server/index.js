require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const socket = require('socket.io')

const accCtrl = require('./controllers/accountController')
const pinCtrl = require('./controllers/pinController')
const tripCtrl = require('./controllers/tripController')
// const todoCtrl = require('./controllers/todoController')
// const gearCtrl = require('./controllers/gearController')

const app = express()

const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
   cookie: {
     maxAge: 1000 * 60 * 60 * 24 * 365
   }
}))

massive(CONNECTION_STRING)
.then((db) => {
  app.set('db', db)
  console.log(`It's working! IT'S WORKING!!!!`);
})

const server = app.listen(SERVER_PORT, () => console.log(`It's over Anakin. I have the ${SERVER_PORT} port`))

// Account Controller requests

app.post('/auth/register', accCtrl.register)
app.post('/auth/login', accCtrl.login)
// app.post('/auth/details', accCtrl.getDetails)
app.post('/auth/update/:id', accCtrl.updateUser)
app.get('/auth/logout', accCtrl.logout)


// Session management

app.get('/auth/session', accCtrl.getSession)

// Pin Controller requests

app.get('/pin', pinCtrl.getAllPins)
app.post('/pin', pinCtrl.createPin)
app.put('/pin/:id', pinCtrl.updatePin)
app.delete('/pin/:id', pinCtrl.deletePin)

// Trip Controller requests

app.get('/trip', tripCtrl.getTrips)
app.get('/trip', tripCtrl.getATrip)
app.post('/trip', tripCtrl.createATrip)
app.delete('/trip/:id', tripCtrl.deleteTrip)


// Sockets stuff

const io = socket(server);

io.on('connection', function(socket){
  console.log('Made contact with the socket', socket.id);

  //Handle Chat Event
  socket.on('chat', function(data){
    //Should add the db.something right here for full stack chat and enable persistence 
    io.sockets.emit('chat', data);
  });

  //Handle Typing Event
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  });

});