const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config()


const PORT = process.env.PORT || 3005

const app = express()

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())

mongoose.set('strictQuery', false);

async function start() {
    try{
        await mongoose.connect('mongodb://alex:PT8aSPOju7cdyEZV@ac-ufmithl-shard-00-00.g8pipfn.mongodb.net:27017,ac-ufmithl-shard-00-01.g8pipfn.mongodb.net:27017,ac-ufmithl-shard-00-02.g8pipfn.mongodb.net:27017/?ssl=true&replicaSet=atlas-iyslbc-shard-0&authSource=admin&retryWrites=true&w=majority')

        app.listen(PORT, () => {
            console.log('server work')
        })
    }catch(e) {
        console.log(e)
    }
}

start()

require('./routes')(app)
