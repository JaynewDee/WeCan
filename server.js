const express = require("express");
const mongoose = require("mongoose");
const api = require('./routes/index')
const path = require('path')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({
     extended: true
}));
app.use(express.json());
app.use(express.static("public"));
app.use('/api', api)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wecan", {
     useNewUrlParser: true,
     useFindAndModify: false,
     useUnifiedTopology: true,
     useCreateIndex: true
});

app.listen(PORT, () => {
     console.log(`App running on port ${PORT}!`);
});

app.get('/', (req, res) => {
     console.log(__dirname)
     res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/exercise', (req, res) => {
     res.sendFile(path.join(__dirname, 'public/exercise.html'))
})

app.get('/stats', (req, res) => {
     res.sendFile(path.join(__dirname, 'public/stats.html'))
})

app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'public/index.html'))
})