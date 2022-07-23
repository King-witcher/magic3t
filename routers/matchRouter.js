const controller = require('../controllers/matchController')
const { authenticate } = require('../middlewares/auth')

// /session
module.exports = require('express').Router()
    .get('/', authenticate, controller.matchInfo)