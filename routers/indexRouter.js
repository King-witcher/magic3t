const matchMakingRouter = require('./matchMakingRouter')
const sessionRouter = require('./sessionRouter')
const signinRouter = require('./signinRouter')

module.exports = require('express').Router()
    .use('/matchmaking', matchMakingRouter)
    .use('/session', sessionRouter)
    .use('/signin', signinRouter)