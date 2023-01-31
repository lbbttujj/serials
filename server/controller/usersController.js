const Users = require('../models/users')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const isDev = process.env.NODE_ENV === 'development'
const tokenService = require('../service/tokenService')
const UserDto = require('../dtos/userDto')
// const mailService = require('../service/mailService')
// const telegramService = require('../service/telegramService')

class UsersController {
	async registrate(req, res) {
		const { username, password } = req.body
		try {
			if (isDev) {
				res.json({ message: `Пользователь ${username} создан` })
			} else {
				const candidate = await Users.findOne({ username: username })
				if (candidate) {
					throw new Error('Пользователь с таким именем уже существует')
				}
				const hashPassword = await bcrypt.hash(password, 3)
				const activationLink = uuid.v4()
				const user = await Users.create({
					username,
					password: hashPassword,
					activationLink,
				})

				// await telegramService.sendActivationMessage()

				const userDto = new UserDto(user)
				const tokens = tokenService.generateTokens({ ...userDto })
				await tokenService.saveToken(userDto.id, tokens.refreshToken)

				const result = { ...tokens, user: userDto }
				res.cookie('refreshToken', result.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				})
				res.json(result)
			}
		} catch (e) {
			res.status(400).json({ message: e })
		}
	}

	async users(req, res) {
		try {
			// if (isDev) {
			// 	res.json(getMockSerials(serialCardNumber))
			// } else {
			const users = await Users.find()
			res.json(users)
			// }
		} catch (e) {
			res.status(400).json({ message: e })
		}
	}

	async login(req, res) {
		try {
			console.log('LOOOOGGGGIIIIIINNNNNN')
			const { username, password } = req.body
			const user = await Users.findOne({ username: username })
			if (!user) {
				throw new Error('Пользователь с таким именем не существует')
			}

			const isPassEqual = await bcrypt.compare(password, user.password)
			if (!isPassEqual) {
				throw new Error('Пароль некорректен')
			}

			const userDto = new UserDto(user)
			const tokens = tokenService.generateTokens({ ...userDto })
			await tokenService.saveToken(userDto.id, tokens.refreshToken)

			const result = { ...tokens, user: userDto }
			res.cookie('refreshToken', result.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.json(result)
		} catch (e) {
			res.status(400).json({ message: e })
		}
	}

	async logout(req, res) {
		try {
			console.log('looooooggggooouuuuutttttt')
			const { refreshToken } = req.cookies
			const token = await tokenService.removeToken(refreshToken)
			res.clearCookie('refreshToken')
			console.log('success')
			res.json(token)
		} catch (e) {
			res.status(400).json(e)
		}
	}

	async refresh(req, res) {
		try {
			const { refreshToken } = req.cookies
			if (!refreshToken) {
				throw new Error('Токена нет')
			}
			const userData = await tokenService.validateRefreshToken(refreshToken)
			const tokenFromDB = await tokenService.findToken(refreshToken)
			if (!userData || !tokenFromDB) {
				throw new Error('Пользователь не авторизиован')
			}

			res.clearCookie('refreshToken')
			const user = await Users.findById(userData.id)
			const userDto = new UserDto(user)
			const tokens = tokenService.generateTokens({ ...userDto })
			await tokenService.saveToken(userDto.id, tokens.refreshToken)

			const result = { ...tokens, user: userDto }

			res.cookie('refreshToken', result.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.json(result)
		} catch (e) {
			res.status(400).json(e)
		}
	}
}

module.exports = new UsersController()
