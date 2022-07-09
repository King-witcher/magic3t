const controller = require('../controllers/userController')

module.exports = require('express').Router()
    .post('/', controller.create)