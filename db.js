const mongoose = require('mongoose')

// Define the mongo db connection URL
const mongoDBURL = 'mongodb://127.0.0.1:27017/hotels'

mongoose.connect(mongoDBURL)

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