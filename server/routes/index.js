const Serials = require('../models/serials')

module.exports = function (app){
    app.post('/add', async (req, res) => {
        const newSerial = new Serials(req.body)
        try {
           await newSerial.save()
        }
        catch (e) {
           res.json({message: e})
        }
        res.json({message: 'охуенно'})
    })

    app.get('/serials', async (req, res) => {
        try {
            const serials = await Serials.find()
            res.json(serials)
        }
        catch (e) {
            res.json({message: e})
        }

    })

    app.post('/delete', async (req, res) => {
        try {
            const {id} = req.body
            await Serials.deleteOne({_id: id})
            res.json({message: (`Объект ${id} успешно удален`)})
       } catch (e) {
            res.json({message: e})
        }
    })
}