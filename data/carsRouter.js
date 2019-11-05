const express = require('express')

const carsDb = require('./dbconfig')

const router = express.Router();

router.get('/', (req, res) => [
  carsDb
    .select('*')
    .from('cars')
    .then(cars => {
      res.status(200).json(cars)
    })
    .catch(error => {
      res.status(500).json({message: "Error getting the cars"})
    })
])

router.post('/', (req, res) => {
  const newCar = req.body;
  carsDb('cars')
    .insert(newCar)
    .into('cars')//table
    .then(ids => {
      res.status(200).json(ids)
    })
    .catch(error => {
      res.status(500).json({message: 'Failed to add car.'})
    })
})

module.exports = router;