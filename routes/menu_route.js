const express = require('express');
const MenuItem = require('../models/menu_model');

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const menuItem = MenuItem(data)

    const savedMenu = await menuItem.save()
    res.status(200).json(savedMenu)
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ 'error': 'Internal server error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find()
    res.status(200).send(data)
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ 'error': 'Internal server error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const response = await MenuItem.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })

    if (!response) {
      res.status(404).json({ 'message': 'No data found' })
    }
    res.status(200).json(response)

  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ 'error': 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try { 
    const id = req.params.id;
    const response = await MenuItem.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ 'message': 'No data found' })
    }
    res.status(200).json({'message': 'Menu deleted', 'id': response._id})
  } catch (err) {
    console.error('Error', err)
    res.status(500).json({ 'error': 'Internal server error' })
  }
})

module.exports = router