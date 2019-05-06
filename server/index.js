require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const accCtrl = require('./controllers/accountController')
// const pinCtrl = require('./controllers/pinController')
// const tripCtrl = require('./controllers/tripController')
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
  app.listen(SERVER_PORT, () => console.log(`It's over Anakin. I have the ${SERVER_PORT} port`))
})

// Account Controller requests

app.post('/auth/register', accCtrl.register)
app.post('/auth/login', accCtrl.login)
app.get('/auth/logout', accCtrl.logout)

// app.get('/', pinCtrl.getPins)