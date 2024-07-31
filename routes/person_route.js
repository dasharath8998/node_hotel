const express = require('express');
const Person = require('../models/person_model');

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

router.get('/', async (req, res) => {
  try {
    const listOfData = await Person.find();
    res.status(200).json(listOfData);
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
      res.status(404).json({"message": "No data found"})
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
      res.status(404).json({"message": "No data found"})
    }
    res.status(200).json({"message": "User deleted succesfully", "id": response._id})
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ "error": "Internal server error" })
  }
})

module.exports = router