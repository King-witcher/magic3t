const sessionRouter = require('./sessionRouter')
const signinRouter = require('./signinRouter')

module.exports = require('express').Router()
    .use('/session', sessionRouter)
    .use('/signin', signinRouter)
    
    .get('/', (req, res) => {
        res.send({
            success: true,
            message: "",
            payload: req.body
        })
    })