var mongoose = require('mongoose');
var CYOAschema = new mongoose.Schema({
	title: {type:String, required: true},
	description: {type:String, default: ""},
}, {timestamps: true})
mongoose.model('CYOA', CYOAschema)
