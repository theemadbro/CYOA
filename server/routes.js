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
			title: req.body.title
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

	//get all stories
	app.get('/story', function(req, res) {
		console.log('get all')
		story.find({}, function(err, data) {
			if (err) {
				console.log(err)
				pack['state'] = 'bad'
				pack['data'] = err
				res.json(err)
			}
			else {
				res.json({data: data})
			}
		})
	})

	//get a story
	app.get('/story/:id', function(req, res) {
		console.log('get one')
		story.findOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			else {
				res.json(singleData)
			}
		})
	})

	//edit a preexisting story
	app.put('/story/:id', function(req, res) {
		let updatedInfo = {
			title: req.body.title
		}
		story.updateOne({_id: req.params.id}, updatedInfo, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			} 
			else { 
				console.log('changed '+ singleData._id)
				console.log(singleData)
				res.json(singleData)
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
	app.post('/story/:id/newnode', function(req,res) {
		var pack = {
			state: 'good',
			data: ''
		}
		console.log('creating new node')
		story.findOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			else {
				currentStory = singleData
				console.log(currentStory)
				currentStory.nodeList.push({content: req.body.content, transitions: req.body.transitions, note: req.body.note})
				currentStory.save(function(err, data){
					if (err) {
						console.log('NODE CREATION ERROR')
						pack['state'] = 'bad'
						pack['data'] = err
						res.json(pack)
					}
					else {
						console.log('NODE ADDED SUCCESSFULLY')
						pack['data'] = data
						res.json(pack)
						// res.redirect('/pets/'+data._id)
					}
				})
			}
		})
	})

	//edit a preexisting node in a story
	app.put('/story/:id1/node/:id2', function(req, res) {
		story.findOneAndUpdate(
			{"_id": req.params.id1, "nodeList._id": req.params.id2}, 
			{$set:{"nodeList.$.content":req.body.content, "nodeList.$.note":req.body.note}},
			{returnNewDocument: true},
			function(err, finalData) {
				if (err) {
					console.log(err)
					res.json(err)
				}
				else {
					console.log("Updated node data: ", finalData)
					res.json(finalData)
				}
			}
		)
	}) 

	//delete node from specific story
	app.delete('/story/:id1/node/:id2', function(req, res) {
		var pack = {
			state: "good",
			data: '',
		}
		console.log('Removing node ', req.params.id2, ' from story ', req.params.id1)
		story.findOne({_id: req.params.id1}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			else {
				update = singleData
				console.log('update', update)
				update.nodeList.pull(req.params.id2)
				update.save(function(err, data){
					if (err) {
						console.log('ERROR IN NODE DELETION')
						pack['state'] = 'bad'
						pack['data'] = err
						res.json(pack)
					}
					else {
						console.log('DELETE SUCCESSFULL')
						pack['data'] = data
						res.json(pack)
					}
				})
			}
		})
	})

	//contribute positive/negative vote to a story
	app.put('/story/:id1', function(req, res) {
		console.log('vote request on story ', req.params.id1)
		var pack = {
			state: "good",
			data: '',
		}

		story.findOne({_id: req.params.id1}, function(err, singleData) {
			if (err) {
				console.log('error!', err)
				res.json(err)
			}
			else {
				console.log('success!', singleData)
				story = singleData
				if (req.body.val == '+'){
					console.log('upvote')
					var quoteU = story.quotes.id(req.params.id2)
					quoteU.rating += 1
				}
				else {
					console.log('downvote')
					var quoteU = story.quotes.id(req.params.id2)
					quoteU.rating -= 1
				}
				story.save(function(err, data) {
					if (err) {
						console.log('ERROR IN RATING STORY ', req.params.id1)
						res.json(err)
					}
					else {
						pack['data'] = data
						res.json(pack)
					}
				})
			}
		})
	})

	//catch angular routes
	app.all("**", (req, res, next) => {
		console.log('route hits!')
		res.sendFile(path.resolve("./client/dist/client/index.html"))
	})
}
