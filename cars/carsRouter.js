const express = require('express')

const carsDb = require('../data/dbConfig')

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

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({message: `No ${id} found for this car.`})
    
  }
  carsDb
    .select('*')
    .from('cars')
    .where('id', '=', id)
    .then(cars => {
      res.status(200).json(cars)
    })
    .catch(error => {
      res.status(500).json({error: `Unable to get car with id ${id}`})
    })
})

router.post('/', (req, res) => {
  const newCar = req.body;
  carsDb('cars')
    .insert(newCar)
    .into('cars')//table
    .then(ids => {
      res.status(200).json(ids)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'Failed to add car.'})
    })
})

router.put('/:id', (req, res) => {

})

module.exports = router;