const mongoose = require('mongoose')
require('dotenv').config()

// Live Url
const LIVE_URL = process.env.MONGO_LIVE_URL
const LOCALHOST_URL = process.env.MONGO_LOCAL_URL
const mongoLiveUrl = LOCALHOST_URL
// Define the mongo db connection URL
// const mongoDBURL = LOCALHOST_URL

mongoose.connect(mongoLiveUrl)

// Get the default connection
// Mongoose maintains a default connection object representation the MongoDB connection.
const db = mongoose.connection;

// Define event listener for database connection
db.on('connected', () => {
  console.log('connnected to mongodb');
});

db.on('error', (err) => {
  console.error('connnected to mongodb', err);
});

db.on('disconnected', () => {
  console.log('disconnnected to mongodb');
});


// Export database connection
module.exports = {
  db
};
