const express = require('express');
const Person = require('../models/person_model');
const { jwtAuthMiddleware, generateToken } = require('../jwt')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const addedPerson = await newPerson.save()
    res.status(200).json(addedPerson)
  } catch (err) {
    console.error('Error', err)
    res.status(200).json({ 'errpr': 'Internal server error' })
  }
});

router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const listOfData = await Person.find();
    res.status(200).json(listOfData);
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ "error": "Internal server error" })
  }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const person = await Person.findById(userId);
    res.status(200).json(person);
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ "error": "Internal server error" })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedReq = req.body

    const response = await Person.findByIdAndUpdate(id, updatedReq, {
      new: true,
      runValidators: true
    })

    if (!response) {
      res.status(404).json({ "message": "No data found" })
    }

    res.status(200).json(response)
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ "error": "Internal server error" })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await Person.findByIdAndDelete(id)
    if (!response) {
      res.status(404).json({ "message": "No data found" })
    }
    res.status(200).json({ "message": "User deleted succesfully", "id": response._id })
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ "error": "Internal server error" })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const userData = req.body;

    const person = Person(userData);
    const response = await person.save();

    const token = generateToken({ username: response.username });

    res.status(200).json({ response: response, token: token })

  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ "error": "Internal server error" })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const person = await Person.findOne({ username: username });

    if (!person || !(await person.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const payload = {
      id: person.id,
      username: person.username
    }

    const token = generateToken(payload);

    res.status(200).json({ token: token });
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ "error": "Internal server error" })
  }
})

module.exports = router