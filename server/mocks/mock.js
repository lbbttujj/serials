const { loremIpsum } = require('lorem-ipsum')
const fs = require('fs')
const path = require('path')

const imagesPaths = ['breaking.jpg', 'friends.jpg', 'kotya.jpg']
const tags = ['Ситком', 'Драма', 'Ужасы']
const base64ImageBunch = []

const getBase64PhotoBunch = (image) => {
	const bitmap = fs.readFileSync(path.resolve(__dirname, './images/', image))
	base64ImageBunch.push(new Buffer(bitmap).toString('base64'))
}
imagesPaths.forEach((image) => getBase64PhotoBunch(image))

const arbitraryArrayElement = (array) => {
	return array[Math.round(Math.random() * (array.length - 1))]
}

const arbitraryLengthArray = (array) => {
	const randomLength = Math.round(Math.random() * (array.length - 1))
	const resultArray = []
	for (let i = 0; i <= randomLength; i++) {
		resultArray.push(arbitraryArrayElement(array))
	}
	return resultArray
}

function Serial() {
	this.id = loremIpsum({
		count: 1,
		sentenceLowerBound: 20,
		sentenceUpperBound: 20,
	})
	this.title = loremIpsum({ count: 2, units: 'word' })
	this.description = loremIpsum({ count: 3 })
	this.years = `${Math.round(Math.random() * 20 + 1980)}-${Math.round(
		Math.random() * 23 + 2000
	)}`
	this.rating = `${Math.round(Math.random() * 100 + 1)}`
	this.country = 'США'
	this.series = Math.round(Math.random() * 100)
	this.tags = arbitraryLengthArray(tags)
	this.image = arbitraryArrayElement(base64ImageBunch)
}

module.exports = function (count) {
	const serials = []
	for (let i = 0; i < count; i++) {
		serials.push(new Serial())
	}
	return serials
}
