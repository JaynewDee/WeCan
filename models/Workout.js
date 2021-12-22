const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
     day: {
          type: Date,
          default: Date.now()
     },

     exercises: [
          {
               type: {
                    type: String,
                    trim: true,
                    required: "Exercise type required. e.g. Resistance, Cardio, Stretch"
               },
               name: {
                    type: String,
                    trim: true,
                    required: "Name of exercise required. e.g. Bench Press, Squats, etc."
               },
               duration: {
                    type: Number,
                    required: "Duration required.  Please enter expected exercise duration in minutes."
               },
               weight: {
                    type: Number
               },
               reps: {
                    type: Number
               },
               sets: {
                    type: Number
               },
               distance: {
                    type: Number
               }
          }
     ]
})

const Workout = mongoose.model("Workout", workoutSchema);


module.exports = Workout;