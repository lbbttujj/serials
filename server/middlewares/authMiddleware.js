const tokenService = require('../service/tokenService')
module.exports = async function (req, res, next) {
	try {
		console.log('aaaaaaa')
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) {
			throw new Error('Нет токена')
		}
		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			throw new Error('Нет токена')
		}
		const userData = await tokenService.validateAccessToken(accessToken)
		console.log('userData', userData)
		if (!userData) {
			throw new Error('Токен не валидный')
		}

		req.user = userData
		next()
	} catch (e) {
		res.status(400).json({ message: 'ytn' })
	}
}
