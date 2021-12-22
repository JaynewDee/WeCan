const api = require('express').Router();
const workoutRouter = require('./workouts');
const path = require('path');

api.use('/workouts', workoutRouter);

api.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/index.html'))
})

api.get('/exercise', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

api.get('/stats', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/stats.html'))
})

api.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '/public/index.html'))
})

module.exports = api;