const jwt = require('jsonwebtoken')
const Token = require('../models/tokenModel')

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		})
		return {
			accessToken,
			refreshToken,
		}
	}
	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			tokenData.save()
		}
		return await Token.create({ user: userId, refreshToken })
	}

	async removeToken(refreshToken) {
		return Token.deleteOne({ refreshToken })
	}

	async validateAccessToken(accessToken) {
		try {
			return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
		} catch (e) {
			return null
		}
	}
	async validateRefreshToken(refreshToken) {
		try {
			return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
		} catch (e) {
			return null
		}
	}

	async findToken(refreshToken) {
		try {
			return await Token.findOne({ refreshToken })
		} catch (e) {}
	}
}

module.exports = new TokenService()
