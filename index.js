const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//setup app
const app = express();

// connect
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use("/api", require('./routes/api'));

//error handling
app.use((err, req, res, next) => {
    res.status(422).send({
            error: err.message
        }
    );
});

app.listen(process.env.port || 4000 ,() => {
    console.log("Now lisitning for you");
});