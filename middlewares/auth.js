const { Token, User } = require('../models')

function authenticate(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token)
        return res.status(403).json({
            success: false,
            message: 'unauthenticated',
            payload: null
        })

    let fetched = Token.findOne({ value: token })
    if (fetched) {
        req.userId = fetched.userId
        next()
    }
    else
    return res.status(403).json({
        success: false,
        message: 'unauthenticated',
        payload: null
    })
}

module.exports = authenticate