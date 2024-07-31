const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
  "name": {
    type: String,
    required: true
  },
  "price": {
    type: Number,
    required: true
  },
  "taste": {
    type: String,
    required: true,
    enum: ['sweet', 'spicy', 'sour']
  },
  "is_drink": {
    type: Boolean,
    default: false,
  },
  "ingredints": {
    type: [String],
    required: true
  },
  "num_sales": {
    type: Number,
    default: 0
  },
})

const MenuItem = mongoose.model('Menu', menuSchema, "Menu")

module.exports = MenuItem