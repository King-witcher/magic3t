const { Token, User } = require('../models')

async function authenticate(req, res, next) {
    const token = req.cookies.accessToken
    if (!token)
        return res.status(403).json({
            success: false,
            message: 'unauthenticated',
            payload: null
        })

    let fetched = await Token.findOne({ where: { value: token } })
    if (fetched) {
        req.userId = fetched.UserId
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