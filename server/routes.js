const mongoose = require('mongoose'),
	**MODEL** = mongoose.model('***MODEL NAME***')
module.exports = function(app) {
	app.get('/***API_NAME***', function(req, res) {
		console.log('get all')
		**MODEL**.find({}, function(err, data) {
			if (err) {
				console.log('bork', err)
				res.json({error: err})
			}
			else {
				res.json({data: data})
			}
		})
	})
	app.post('/***API_NAME***', function(req, res) {
		console.log('Post route!')
		var **NEW_DOC** = new **MODEL({
			//
			//
			// MODEL DOCUMENT FIELDS
			//
			//
		})
		**NEW_DOC**.save(function(err, data){
			if (err) {
				console.log(err)
				res.json(err)
			}
			else {
				console.log(data._id)
				res.redirect('/tasks/'+data._id)
			}
		})
	})
	app.get('/***API_NAME***/:id', function(req, res) {
		console.log('get one')
		tasks.findOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			else {
				res.json(singleData)
			}
		})
	})
	app.put('/***API_NAME***/:id', function(req, res) {
		let updatedInfo = {
			//
			//
			// Make sure all updated info is here!
			//
			//
		}
		tasks.updateOne({_id: req.params.id}, updatedInfo, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			} 
			else { 
				console.log('changed '+singleData._id)
				console.log(singleData)
				res.json(singleData)
			}
		})
	})
	app.delete('/***API_NAME***/:id', function(req, res) {
		tasks.deleteOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			// Will return a message of if the action went ok
			res.json(singleData)
		})
	})
}
