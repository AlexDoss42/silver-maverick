require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const ctrl = require('./controller')

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