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
    .first()
    .then(cars => {
      if (cars){
        res.status(200).json(cars)
      } else {
        res.status(404).json({message: "Unable to find car with id"})
      }
    })
    .catch(error => {
      res.status(500).json({error: `Unable to get car with id ${id}`})
    })
})

router.post('/', (req, res) => {
  const newCar = req.body;
  if (!newCar.vin) {
    return res.status(400).json({message: "Please add VIN"})
  } else if (!newCar.make) {
    return res.status(400).json({message: "Please add make"})
  } else if (!newCar.model) {
    return res.status(400).json({message: "Please add model"})
  } else if (!newCar.mileage) {
    return res.status(400).json({message: "Please add mileage"})
  }
  carsDb('cars')
    .insert(newCar)
    .into('cars')//table
    .then(ids => {
      res.status(200).json(ids)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'Failed to add car. The car may already exist.'})
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id) {
    res.status(404).json({message: `No ${id} found for this car.`})
  }
  carsDb('cars')
    .where('id', '=', id)
    .update(changes)
    .then(count => {
      if(count) {
        res.status(201).json(count)
      } else {
        res.status(404).json({message: "No car found with this id"})
      }
    })
    .catch(error => {
      res.status(500).json({message: `Failed to update car with id of ${id}`})
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  if(!id) {
    return res.status(404).json({message: 'No id found'})
  }
  carsDb('cars')
    .where('id', '=', id)
    .del()
    .then(count => {
      res.status(200).json(count)
    })
    .catch(error => {
      res.status(500).json({error: "Failed to delete car."})
    })
})

module.exports = router;