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
		console.log(req.body)
		var newstory = new story({
			title: req.body.title,
			author: req.body.author
		})
		console.log('newstory', newstory)
		let nlist = req.body.fresh
		let trnlist = req.body.trans
		console.log(nlist)
		console.log(nlist, nlist.length)
		// for(var i in nlist){
		// 	console.log(nlist[i])
		// 	newstory.nodeList[i] = new node({content: nlist[i].content, note: nlist[i].note})
		// }
		for (let i=0; i < nlist.length; i++){
			console.log(i, nlist[i])
			newstory.nodeList[i] = new node({content: nlist[i].content, note: nlist[i].note})
		}
		console.log('-------')
		console.log('-------')
		console.log('newstory after adding nodes?')
		console.log(newstory)
		console.log('-------')
		console.log('-------')
		console.log('-------')
		console.log('newstory nodelist!', '0', newstory.nodeList[0], '1', newstory.nodeList[1] )
		for (var i = 0; i < nlist.length; i++) {
			console.log('hecck')
			console.log('hecck')
			console.log('hecck')
			console.log('hecck')
			console.log('hecck')
			console.log(i)
			console.log(newstory.nodeList[i].transitions)
			// console.log(newstory.nodeList[i])
			let test = newstory.nodeList[i]
			console.log('test =',test)
			let nnid = test._id
			console.log('nnid, or test id, =', nnid)
			for (var x = 0; x < trnlist[i].length; x++){
				let temp = trnlist[i][x]
				console.log('temp', temp)
				if(temp == -1){
					console.log('SKIB tHIS')
					continue
				}
				console.log('node', temp, '=', newstory.nodeList[temp])
				let nobj = newstory.nodeList[temp]
				console.log('nobj',nobj)
				nnitrans = newstory.nodeList[i].transitions
				console.log('nnitrans',nnitrans)
				nnitrans.push(nobj._id)
			}




			// newstory.nodeList[i].transitions.push(newstory.nodelist[trnlist[i][0]]._id)
			// for (var x = 0; x < newstory[nodeList][i].length; x++) {
			// 	newstory.nodeList[i].transitions.push(newstory.nodeList[nlist[i].nodeList[x]]._id)
			// }
		}
		newstory.save(function(err, data){
			console.log('story saved!')
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
		var pack = {
			state: 'good',
			data: ''
		}
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
			{new: true},
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

				/* old attempt at deelting node from relevant transition lists, might have to move the lower function up here to account for verification of story existing
				update.find({ nodeList: {$in: {"transitions":"req.params.id2"}}}, function(err, parents) {
					if (err) {
						console.log(err)
						pack['state'] = 'bad'
						pack['data'] = err
						res.json(err)
					}
					else {
						console.log(parents)
						parents.forEach(parents.transitions.pull(req.params.id2))
					}
				})
				*/

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
						//res.json(pack)
					}
				})
			}
		})
		//remove deleted node from references
		story.update({"_id": req.params.id1, "nodeList.transitions":req.params.id2},
			{$pullAll:{"nodeList.$.transitions":[req.params.id2]}},
			function(err, singleData) {
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

	//create link from one node (using fromid) to another (using toid)
	app.put('/story/:id/node/:fromid/:toid', function(req, res) {
		story.findOneAndUpdate(
			{"_id": req.params.id, "nodeList._id": req.params.fromid}, 
			{$push:{"nodeList.$.transitions":req.params.toid}},
			{new: true},
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

	//contribute positive/negative vote to a story
	app.put('/vote/:id1', function(req, res) {
		console.log('vote request on story ', req.params.id1)
		var pack = {
			state: "good",
			data: '',
		}

		story.findOne({_id: req.params.id1}, function(err, storyData) {
			if (err) {
				console.log('error!', err)
				res.json(err)
			}
			else {
				console.log('success!', storyData)
				update = storyData
				if (req.body.val == '+'){
					console.log('upvote')
					update.rating += 1
				}
				else {
					console.log('downvote')
					update.rating -= 1
				}
				storyData.save(function(err, data) {
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
