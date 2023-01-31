const Serials = require('../models/serials')
const getMockSerials = require('../mocks/mock')

const isDev = process.env.NODE_ENV === 'development'
const serialCardNumber = 32

class SerialsController {
	async getSerials(req, res) {
		try {
			console.log('___________serials_____________')
			if (isDev) {
				res.json(getMockSerials(serialCardNumber))
			} else {
				const serials = await Serials.find()
				res.json(serials)
			}
		} catch (e) {
			res.json({ message: e })
		}
	}

	async addSerial(req, res) {
		const newSerial = new Serials(req.body)
		try {
			if (isDev) {
				res.json({ message: 'add Success' })
			} else {
				await newSerial.save()
				res.json({ message: 'add Success' })
			}
		} catch (e) {
			res.status(400).json({ message: e })
		}
	}

	async deleteSerial(req, res) {
		const { id } = req.body
		try {
			if (isDev) {
				res.json({ message: `Объект ${id} успешно удален` })
			} else {
				await Serials.deleteOne({ _id: id })
				res.json({ message: `Объект ${id} успешно удален` })
			}
		} catch (e) {
			res.json({ message: e })
		}
	}

	async updateSerial(req, res) {
		const { _id } = req.body
		try {
			if (isDev) {
				res.json({ message: `Объект ${_id} успешно обновлен` })
			} else {
				await Serials.findByIdAndUpdate(_id, { ...req.body })
				res.json({ message: `Объект ${_id} успешно обновлен` })
			}
		} catch (e) {
			res.json({ message: e })
		}
	}
}

module.exports = new SerialsController()
