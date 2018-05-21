var mongoose = require('mongoose');
var ***NEW SCHEMA*** = new mongoose.Schema({
	title: {type:String, required: true},
	description: {type:String, default: ""},
}, {timestamps: true})
mongoose.model('***NEW MODEL***', ***NEW SCHEMA***)
