const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const options = { keepAlive: 300000, connectTimeoutMS: 30000 };

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(bodyParser.json())

// Use Angular
app.use(express.static( __dirname + '/client/dist/client' ));

mongoose.connect('mongodb://localhost/CYOA', options)
require('./server/models.js')

require('./server/routes.js') (app)


io.on('connection', (socket) => {
	console.log('user connected')

	socket.on('disconnect', function() {
		console.log('user disconnected')
	})

	socket.on('message', (message) => {
		console.log("message", message)
		io.emit('message', {type:'new-message', text: message});
	})
})


http.listen(8000, function() {
    console.log("listening on port 8000");
})