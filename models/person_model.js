const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { use } = require('passport');

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
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

personSchema.pre('save', async function (next) {
  const user = this;

  if (!this.isModified('password')) { next(); }

  console.log(user.password)
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    next();
  } catch (err) {
    next(err)
  }
})

personSchema.pre('update', async function (next) {
  const user = this;

  if (!this.isModified('password')) { next(); }

  console.log(user.password)
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    next();
  } catch (err) {
    next(err)
  }
})

personSchema.methods.comparePassword = async function (pass) {
  try {
    console.log('pass 123 ' + pass)
    console.log('this.password 123 ' + this.password)
    const match = await bcrypt.compare(pass, this.password);
    console.log('match 123 ' + match)
    return match
  } catch (err) {
    throw err;
  }
}

const Person = mongoose.model('person', personSchema, "Person")

module.exports = Person;