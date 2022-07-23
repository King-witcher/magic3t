const AbstractController = require('./abstractController')
const { User, Token } = require('../models')
const { containsFields } = require('../helpers/functions')
const CryptoJS = require('crypto-js')
const bcrypt = require ('bcrypt')

module.exports = class SessionController extends AbstractController {

    static async sessionInfo(req, res) {
        let user = await User.findByPk(req.userId)
        
        super.response(res, {
            userId: user.id,
            nickname: user.nickname,
            email: user.email
        })
    }

    static async login(req, res) {
        // Testa os campos
        let fieldTest = containsFields(req.body, ['username', 'password'])
        if (!fieldTest.success)
            return super.responseError(res, 422, `${fieldTest.missingField} is missing.`)
        
        // Procura pelo usuário informado
        let user = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (user && await bcrypt.compare(req.body.password, user.passwordDigest)) {

            let token = CryptoJS.lib.WordArray.random(32).toString()

            await Token.create({
                value: token,
                UserId: user.id
            })

            res.cookie('accessToken', token)

            return super.response(res, {
                nickname: user.nickname,
                token: token,
            })
        } else {
            return super.responseError(res, 401, 'login failed')
        }
    }

    static async logout(req, res) {
        let token = await Token.findOne({ where: { value: req.cookies.accessToken } })
        token.destroy()
        res.clearCookie('accessToken')
        return super.response(res, '')
    }

    static async fullLogout(req, res) {
        let token = await Token.findAll({ where: { UserId: req.userId } })
        await Token.destroy({ where: { UserId: req.userId } })
        res.clearCookie('accessToken')
        return super.response(res, '')
    }
}