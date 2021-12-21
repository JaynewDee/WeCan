const express = require('express');

const exerciseRouter = require('./exercises')

const app = express();

app.use('/exercises', exerciseRouter);

module.exports = app;