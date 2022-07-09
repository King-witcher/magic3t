const controller = require('../controllers/sessionController')

module.exports = require('express').Router()
    .post('/', controller.login)
    .delete('/', controller.logout)