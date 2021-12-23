const workouts = require('express').Router();
const db = require('../models')
const mongoose = require('mongoose');
const Workout = require('../models/Workout')


workouts.get("/", (req, res) => {
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
});

workouts.get("/range", (req, res) => {
     Workout.aggregate([{
               $addFields: {
                    totalDuration: {
                         $sum: "$exercises.duration"
                    }, //seeds
                    totalWeight: {
                         $sum: "$exercises.weight"
                    }, //seeds
               },
          }, ])
          .limit(7) // 7 days in the week
          .sort({
               date: -1
          }) //date parameter in workout.js
          .then((dbWorkout) => {
               res.json(dbWorkout);
          })
          .catch((err) => {
               res.status(400).json(err);
          });
});

workouts.put('/:id', ({ body, params }, res) => {
     Workout.findByIdAndUpdate({
               _id: params.id
          }, {
               $push: {
                    exercises: body
               }
          }, {
               new: true
          })
          .then((dbWorkout) => {
               res.json(dbWorkout);
          })
          .catch((err) => {
               res.status(400).json(err);
          });
})


module.exports = workouts;