const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
require('dotenv').config()
var cors = require('cors')

const PORT = process.env.SERVER_PORT

console.log('PORT: ', PORT)

const app = express()
app.use(bodyParser.json({ limit: '5mb' }))

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/api', router)

mongoose.set('strictQuery', false)

async function start() {
	try {
		if (process.env.NODE_ENV === 'development') {
			app.listen(PORT, () => {
				console.log('dev server work')
			})
		} else {
			await mongoose.connect(process.env.DB_URL)
			app.listen(PORT, () => {
				console.log('server work')
			})
		}
	} catch (e) {
		console.log(e)
	}
}

start()
