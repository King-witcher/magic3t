const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const AbstractController = require('./abstractController')
const { User } = require('../models')
const { containsFields } = require('../helpers/functions')

module.exports = class UserController extends AbstractController {

    // Solicita um cadastro
    static async create(req, res) {
        try {
            // Verifica os campos obrigatórios
            let fieldTest = containsFields(req.body, [ 'username', 'password', 'email' ])
            if (!fieldTest.success)
                return super.responseError(res, 422, fieldTest.missingField + " is missing.")

            // Verifica se não há colisão de campos únicos no banco de dados
            let collision = await User.findOne({
                where: { 
                    [Op.or]: [
                         { email: req.body.email },
                         { username: req.body.username },
                         { nickname: req.body.nickname }
                    ]
                }
            })
            if (collision)
                return super.responseError(res, 422, '')


            // Cria o usuário
            let body = {
                username: req.body.username,
                nickname: req.body.nickname,
                passwordDigest: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
            }

            await User.create(body)

            return super.response(res, '')
        } catch (err) {
            console.error(err)
            return super.responseError(res, 500, 'error on api')
        }
    }

    // Atualiza um cadastro
    static async update(req, res) {

    }
}