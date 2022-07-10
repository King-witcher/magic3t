const controller = require('../controllers/sessionController')
const auth = require('../middlewares/auth')

module.exports = require('express').Router()
    .get('/', auth, controller.sessionInfo)
    .post('/', controller.login)
    .delete('/', auth, controller.logout)