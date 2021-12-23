const workouts = require('express').Router();
const db = require('../models')
const mongoose = require('mongoose');
const Workout = require('../models/Workout')


workouts.get("/", (req, res) => {
     try {    
          Workout.aggregate([{
                    $addFields: {
                         totalDuration: {
                              $sum: "$exercises.duration",
                         },
                    },
               }, ])
               .sort({
                    date: -1
               }) //date parameter in workout.js
               .then((dbWorkout) => {
                    res.json(dbWorkout);
               })
               .catch((err) => {
                    res.status(400).json(err);
               });
          }
     catch (err){console.log(err)}
});

workouts.get("/range", (req, res) => {
     try {
          Workout.aggregate([{
                    $addFields: {
                         totalDuration: {
                              $sum: "$exercises.duration"
                         },
                         totalWeight: {
                              $sum: "$exercises.weight"
                         }, 
                              },
                         }])
               .limit(7)
               .sort({
                    date: -1
               }) 
               .then((workout) => {
                    res.json(workout);
               })
          }
     catch (err){console.log(err)}
});

workouts.put('/:id', ({ body, params }, res) => {
     try {
          Workout.findByIdAndUpdate({
                    _id: params.id
               }, {
                    $push: {
                         exercises: body
                    }
               }, {
                    new: true
               })
               .then((workout) => {
                    res.json(workout);
               })
          }
     catch(err){console.log(err)}
})

workouts.post('/', ({ body }, res) => {
     try {
          Workout.create(body).
               then((workout) => {
                    res.json(workout)
               })
          }
     catch (err) {console.log(err)}
})


module.exports = workouts;