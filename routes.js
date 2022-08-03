const { authenticate } = require('./middlewares/auth')
const matchController = require('./controllers/matchController')
const sessionController = require('./controllers/sessionController')
const userController = require('./controllers/userController')
const queueController = require('./controllers/queueController')

module.exports = require('express').Router()
    .get('/session', authenticate, sessionController.sessionInfo)
    .post('/session', sessionController.login)
    .delete('/session', authenticate, sessionController.logout)
    .delete('/session/all', authenticate, sessionController.fullLogout)

    .get('/queue', authenticate, queueController.queueStatus)
    .post('/queue', authenticate, queueController.enqueue)
    .delete('/queue', authenticate, queueController.dequeue)

    .post('/signin', userController.create)