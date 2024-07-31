const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())

const personRoute = require('./routes/person_route')
const menuRoutes = require('./routes/menu_route')

app.get('/', (req, res) => res.send('Welcome to the Hotel DS'))

app.use('/person', personRoute)
app.use('/menu', menuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server is up and running...');
})