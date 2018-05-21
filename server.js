const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Use Angular
app.use(express.static( __dirname + '/client/dist/client' ));

mongoose.connect('mongodb://localhost/CYOA')
require('./server/models.js')

require('./server/routes.js') (app)

app.listen(8000, function() {
    console.log("listening on port 8000");
})