const path = require('path');
const mongoose = require('mongoose'),
	MODEL = mongoose.model('CYOA')
module.exports = function(app) {
	app.all("**", (req, res, next) => {
		console.log('route hits!')
		res.sendFile(path.resolve("./client/dist/client/index.html"))
	})
}
