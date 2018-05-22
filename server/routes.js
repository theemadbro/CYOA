const path = require('path');
const mongoose = require('mongoose'),
	story = mongoose.model('Story'),
	node = mongoose.model('Node')
module.exports = function(app) {

	//create new story
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

	//delete story
	app.delete('/story/:id', function(req, res) {
		story.deleteOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			// Will return a message of if the action went ok
			res.json(singleData)
		})
	}) 

	//create node
	app.post('/node/new', function(req,res) {
		var pack = {
			state: 'good',
			data: ''
		}
		console.log('creating new node')
		var newnode = new node({
			content: req.body.content,
			note: req.body.note
		})
		newnode.save(function(err, data){
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

	//delete node
	app.delete('/node/:id', function(req, res) {
		node.deleteOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			// Will return a message of if the action went ok
			res.json(singleData)
		})
	}) 

	//catch angular routes
	app.all("**", (req, res, next) => {
		console.log('route hits!')
		res.sendFile(path.resolve("./client/dist/client/index.html"))
	})
}
