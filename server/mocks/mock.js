const { loremIpsum } = require("lorem-ipsum")
const fs = require('fs')
const path = require('path')

const imagesPaths = ['breaking.jpg','friends.jpg','kotya.jpg']
const base64ImageBunch = []

const getBase64PhotoBunch = (image) => {
    const bitmap = fs.readFileSync(path.resolve(__dirname, './images/',image))
    base64ImageBunch.push(new Buffer(bitmap).toString('base64'))
}
imagesPaths.forEach(image => getBase64PhotoBunch(image))

function Serial() {
    this.id = loremIpsum({count:1, sentenceLowerBound: 20, sentenceUpperBound: 20})
    this.title = loremIpsum({count:2, units:'word'})
    this.description = loremIpsum({count:3})
    this.years = `${Math.round(Math.random()*20+1980)}-${Math.round(Math.random()*23+2000)}`
    this.isFinished = Math.random() < 0.5
    this.rating = `${Math.round(Math.random() * 100 + 1)}`
    this.country = "США"
    this.series = Math.round(Math.random() * 100)
    this.image = base64ImageBunch[Math.round(Math.random()*(base64ImageBunch.length-1))]
}

module.exports = function (count) {
    const serials = []
    for(let i=0; i<count; i++) {
        serials.push(new Serial())
    }
    return serials
}