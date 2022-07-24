const controller = require('../controllers/matchMakingController')
const { authenticate } = require('../middlewares/auth')

module.exports = require('express').Router()
    .post('/', authenticate, (req, res) => {
        if (req.body.method === 'enqueue')
            return controller.enqueue(req, res)
        else if (req.body.method === 'dequeue')
            return controller.dequeue(req, res)
        return res.send(404)
    })
    .get('/', authenticate, controller.getStatus)