const controller = require('../controllers/matchMakingController')
const auth = require('../middlewares/auth')

module.exports = require('express').Router()
    .post('/', auth, (req, res) => {
        if (req.body.method === 'enqueue')
            return controller.enqueue(req, res)
        else if (req.body.method === 'dequeue')
            return controller.dequeue(req, res)
        return res.send(404)
    })