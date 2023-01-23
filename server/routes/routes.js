const Serials = require('../models/serials')
const getMockSerials = require('../mocks/mock')

module.exports = function (app) {
	const isDev = process.env.NODE_ENV === 'development'
	const serialCardNumber = 7

	app.post('/add', async (req, res) => {
		const newSerial = new Serials(req.body)
		try {
			if (isDev) {
				res.json({ message: 'add Success' })
			} else {
				await newSerial.save()
				res.json({ message: 'add Success' })
			}
		} catch (e) {
			res.json({ message: e })
		}
	})

	app.get('/serials', async (req, res) => {
		try {
			if (isDev) {
				res.json(getMockSerials(serialCardNumber))
			} else {
				const serials = await Serials.find()
				res.json(serials)
			}
		} catch (e) {
			res.json({ message: e })
		}
	})

	app.post('/delete', async (req, res) => {
		const { id } = req.body
		try {
			if (isDev) {
				res.json({ message: `Объект ${id} успешно удален` })
			} else {
				const { id } = req.body
				await Serials.deleteOne({ _id: id })
				res.json({ message: `Объект ${id} успешно удален` })
			}
		} catch (e) {
			res.json({ message: e })
		}
	})
}
