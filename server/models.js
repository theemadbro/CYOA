var mongoose = require('mongoose');

var Nodeschema = new mongoose.Schema({
	content: {type:String, default: "Enter text here"},
	note: String,
	transitions: {type:[String], default: []},
	descisions: {type: [String], default:[]}
})
mongoose.model('Node', Nodeschema)

var Storyschema = new mongoose.Schema({
	title: {type:String, default: "Enter your title here", required: true},
	author: {type:String, default: 'anonymous'},
	nodeList: [Nodeschema],
	rating : {type:Number, default: 0}
}, {timestamps: true})
mongoose.model('Story', Storyschema)
