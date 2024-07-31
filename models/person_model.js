const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    required: true,
    enum: ['chef', 'waiter', 'manager'],
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  }
})

const Person = mongoose.model('person', personSchema, "Person")

module.exports = Person;