const path = require('path');
const mongoose = require('mongoose'),
	story = mongoose.model('Story'),
	storynode = mongoose.model('Node')
module.exports = function(app) {
	app.post('/story/new', function(req,res) {
		var pack = {
			state: 'good',
			data: ''
		}
		console.log('making new story')
		var newstory = new story({
			title: req.body.title,
			transitionTable: req.body.table
		})
		newstory.save(function(err, data){
			if (err) {
				console.log('POST/CREATION ERRORS!')
				pack['state'] = 'bad'
				pack['data'] = err
				res.json(pack)
			}
			else {
				console.log('POST SUCCESS!')
				pack['data'] = data
				res.json(pack)
				// res.redirect('/pets/'+data._id)
			}
		})
	})
	app.all("**", (req, res, next) => {
		console.log('route hits!')
		res.sendFile(path.resolve("./client/dist/client/index.html"))
	})
}
