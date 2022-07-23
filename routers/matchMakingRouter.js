const Controller = require('../controllers/matchMakingController')
const { authenticate } = require('../middlewares/auth')

module.exports = require('express').Router()
    .post('/', authenticate, (req, res) => {
        if (req.body.method === 'enqueue')
            return Controller.enqueue(req, res)
        else if (req.body.method === 'dequeue')
            return Controller.dequeue(req, res)
        return res.send(404)
    })
    .get('/', authenticate, Controller.check)