const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./auth')

const db = require('./db')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(auth.passport.initialize())

const loggger = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}]: Request Made to ${req.originalUrl}`)
  next()
}

app.use(loggger)

const personRoute = require('./routes/person_route')
const menuRoutes = require('./routes/menu_route')

app.get('/' ,(req, res) => res.send('Welcome to the Hotel DS'))

app.use('/person', personRoute)
app.use('/menu', auth.authValidator, menuRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('server is up and running...');
})