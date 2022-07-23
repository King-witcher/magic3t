const controller = require('../controllers/sessionController')
const { authenticate } = require('../middlewares/auth')

// /session
module.exports = require('express').Router()
    .get('/', authenticate, controller.sessionInfo)
    .post('/', controller.login)
    .delete('/', authenticate, controller.logout)
    .delete('/all', authenticate, controller.fullLogout)