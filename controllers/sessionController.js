const AbstractController = require('./abstractController')
const { User, Token } = require('../models')
const { containsFields } = require('../helpers/functions')
const CryptoJS = require('crypto-js')
const bcrypt = require ('bcrypt')

module.exports = class SessionController extends AbstractController {

    static async sessionInfo(req, res) {
        let user = await User.findByPk(req.userId)
        
        super.response(res, {
            uid: user.id,
            nickname: user.nickname,
            email: user.email
        })
    }

    static async login(req, res) {
        // Testa os campos
        if (!containsFields(req.body, ['username', 'password']))
            return super.responseError(res, 401, 'login failed')
        
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

            return super.response(res, { token: token })
        } else {
            return super.responseError(res, 401, 'login failed')
        }
    }

    static async logout(req, res) {

    }
}