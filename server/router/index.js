const Router = require('express').Router
const SerialController = require('../controller/serialsController')
const UsersController = require('../controller/usersController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/serials', authMiddleware, SerialController.getSerials)
router.post('/add', authMiddleware, SerialController.addSerial)
router.post('/delete', authMiddleware, SerialController.deleteSerial)
router.post('/update', authMiddleware, SerialController.updateSerial)

router.get('/users', UsersController.users)
router.post('/registrate', UsersController.registrate)
router.post('/login', UsersController.login)
router.post('/logout', UsersController.logout)
router.get('/refresh', UsersController.refresh)

module.exports = router
