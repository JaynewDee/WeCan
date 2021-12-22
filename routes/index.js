const express = require('express');
const app = express();
const workoutRouter = require('./workouts')

app.use('/workouts', workoutRouter);

module.exports = app;