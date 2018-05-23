var mongoose = require('mongoose');

var CYOAschema = new mongoose.Schema({
	title: {type:String, required: true},
	description: {type:String, default: ""},
}, {timestamps: true})
mongoose.model('CYOA', CYOAschema)

var Nodeschema = new mongoose.Schema({
	content: {type:String, default: "Enter text here", required: true},
	note: {type:String, required: false},
	transitions: {type:[String], default: [], required: true}
})
mongoose.model('Node', Nodeschema)

var Storyschema = new mongoose.Schema({
	title: {type:String, default: "Enter your title here", required: true},
	nodeList: {type:[Nodeschema], default: mongoose.model('Node', Nodeschema)},
	rating : {type:Number, default: 0, required: true}
}, {timestamps: true})
mongoose.model('Story', Storyschema)
