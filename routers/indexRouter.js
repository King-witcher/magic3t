
module.exports = require('express').Router()
    .get('/', (req, res) => {
        res.send({
            success: true,
            message: "",
            payload: req.body
        })
    })