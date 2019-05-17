require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const socket = require('socket.io')

const accCtrl = require('./controllers/accountController')
const pinCtrl = require('./controllers/pinController')
const tripCtrl = require('./controllers/tripController')
const chatCtrl = require('./controllers/chatController')
// const todoCtrl = require('./controllers/todoController')
const gearCtrl = require('./controllers/gearController')

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
    console.log(db.listTables())
  })

const server = app.listen(SERVER_PORT, () => console.log(`It's over Anakin. I have the ${SERVER_PORT} port`))

// Account Controller requests

app.post('/auth/register', accCtrl.register)
app.post('/auth/login', accCtrl.login)
app.get('/auth/details', accCtrl.getDetails)
app.post('/auth/update/:id', accCtrl.updateUser)
app.get('/auth/logout', accCtrl.logout)
app.get('/auth/allUsers', accCtrl.getAllUsers)

// Group Controller requests (Currently on accCtrl due to laziness)
app.get('/group/members/:trip_id', accCtrl.getTripGroupMembers)
app.post('/auth/invite', accCtrl.inviteToTrip)
app.delete('/group/members/:user_id/:trip_id', accCtrl.removeFromGroup)


// Session management

app.get('/auth/session', accCtrl.getSession)

// Pin Controller requests

app.get('/pin', pinCtrl.getAllPins)
app.get('/pin/tripPins/:trip_id', pinCtrl.getTripPins)
// app.get('/pin/:id', pinCtrl.getPinById)
app.post('/pin', pinCtrl.createPin)
app.put('/pin/:id', pinCtrl.updatePin)
app.delete('/pin/:id', pinCtrl.deletePin)
app.delete('/pin/trip/:pin_id/:trip_id', pinCtrl.RemovePinFromBoard)
app.put('/pinToTrip', pinCtrl.PinToBoard)

// Trip Controller requests

app.get('/trip/allTrips', tripCtrl.getTrips)
app.post('/trip', tripCtrl.createATrip)
app.get('/trip/:id', tripCtrl.getATrip)
app.get('/trip/mytrips/:user_id', tripCtrl.getMyTrips)
app.delete('/trip/:id', tripCtrl.deleteTrip)

// Chat Controller requests

app.get('/chat/tripConversation/:trip_id', chatCtrl.getTripConversation)
app.post('/chat/message', chatCtrl.addMessage)
app.delete('/chat/delete/:chat_id', chatCtrl.deleteMessage)

// Gear Controller requests

app.get('/gear/tripGear/:trip_id', gearCtrl.getTripGear)
app.post('/gear/item', gearCtrl.createGear)
app.put('/gear/update/:gear_id', gearCtrl.updateGear)
app.delete('/gear/delete/:gear_id', gearCtrl.deleteGear)


// Sockets stuff

const io = socket(server);

io.on('connection', function (socket) {
  console.log('Made contact with the socket', socket.id);


  //Handle Typing Event
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data)
  });

  //Joins to the trip's room
  socket.on('join room', data => {
    socket.join(data.trip_id)
  });

  //Handle Chat Event
  socket.on(`chat in room`, function (data) {
    //Should add the db.something right here for full stack chat and enable persistence 
    io.to(data.trip_id).emit('room response', data);
  });

});