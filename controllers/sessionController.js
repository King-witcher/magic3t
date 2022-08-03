const { User, Token } = require('../models')
const { containsFields } = require('../helpers/functions')
const CryptoJS = require('crypto-js')
const bcrypt = require ('bcrypt')

module.exports = {
    async sessionInfo(req, res) {
        let user = await User.findByPk(req.userId)
        
        res.send({
            userId: user.id,
            nickname: user.nickname,
            email: user.email
        })
    },

    async login(req, res) {
        // Testa os campos
        let fieldTest = containsFields(req.body, ['username', 'password'])
        if (!fieldTest.success)
            return res.status(422).send({
                success: false,
                message: `${fieldTest.missingField} is missing.`,
            })
        
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

            return res.send({
                sucess: true,
                nickname: user.nickname,
                token: token,
            })
        } else {
            return res.status(401).send({
                success: false,
                message: 'login failed'
            })
        }
    },

    async logout(req, res) {
        let token = await Token.findOne({ where: { value: req.cookies.accessToken } })
        token.destroy()
        res.clearCookie('accessToken')
        return res.send({ success: true })
    },

    async fullLogout(req, res){
        await Token.destroy({ where: { UserId: req.userId } })
        res.clearCookie('accessToken')
        return res.send({ sucess: true })
    },
}