var mongoose = require('mongoose');

module.exports = mongoose.model('members', {
	name : String,
	gender : String,
	age : String	
});