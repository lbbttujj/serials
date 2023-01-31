const { Schema, model } = require('mongoose')

const Users = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isActivated: {
		type: Boolean,
		default: false,
	},
	activatedLink: {
		type: String,
	},
	favorite: {
		type: [String],
	},
	watched: {
		type: [String],
	},
})

module.exports = model('Users', Users)
