const { Schema, model } = require('mongoose')

const Serials = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	years: {
		type: String,
		required: true,
	},
	rating: {
		type: String,
	},
	country: {
		type: String,
		required: true,
	},
	series: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
	},
	tags: {
		type: [String],
		default: undefined,
	},
	userId: {
		type: String,
	},
})

module.exports = model('Serials', Serials)
