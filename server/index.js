const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
var cors = require('cors')

const PORT = process.env.SERVER_PORT

console.log('PORT: ', PORT)

const app = express()
app.use(bodyParser.json({ limit: '3mb' }))

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())

mongoose.set('strictQuery', false)

async function start() {
	try {
		if (process.env.NODE_ENV === 'development') {
			app.listen(PORT, () => {
				console.log('dev server work')
			})
		} else {
			await mongoose.connect(
				'mongodb://alex:PT8aSPOju7cdyEZV@ac-ufmithl-shard-00-00.g8pipfn.mongodb.net:27017,ac-ufmithl-shard-00-01.g8pipfn.mongodb.net:27017,ac-ufmithl-shard-00-02.g8pipfn.mongodb.net:27017/?ssl=true&replicaSet=atlas-iyslbc-shard-0&authSource=admin&retryWrites=true&w=majority'
			)
			app.listen(PORT, () => {
				console.log('server work')
			})
		}
	} catch (e) {
		console.log(e)
	}
}

start()

require('./routes/routes')(app)
