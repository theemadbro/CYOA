var mongoose = require('mongoose');

var CYOAschema = new mongoose.Schema({
	title: {type:String, required: true},
	description: {type:String, default: ""},
}, {timestamps: true})
mongoose.model('CYOA', CYOAschema)

var Nodeschema = new mongoose.Schema({
	content: {type:String, required: true},
	note: {type:String, required: false},
	//consider adding functionality of including images or other features to each node
})
mongoose.model('Node', Nodeschema)

var Storyschema = new mongoose.Schema({
	title: {type:String, required: true},
	transitionTable: {type:[[Number]], required: true},
	nodeList: {type:[Nodeschema], default: mongoose.model('Node', Nodeschema) },
}, {timestamps: true})
mongoose.model('Story', Storyschema)
