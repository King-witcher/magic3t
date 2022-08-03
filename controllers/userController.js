const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const Router = require('express').Router()

const { User } = require('../models')
const { containsFields } = require('../helpers/functions')

module.exports = {
    async create(req, res) {
        try {
            // Verifica os campos obrigatórios
            let fieldTest = containsFields(req.body, [ 'username', 'password', 'email', 'nickname' ])
            if (!fieldTest.success)
                return res.status(422).send({
                    success: false,
                    message: `${fieldTest.missingField} is missing.`
                })

            // Verifica se não há colisão de campos únicos no banco de dados
            let collision = await User.findOne({
                where: { 
                    [Op.or]: [
                         { username: req.body.username },
                         { nickname: req.body.nickname }
                    ]
                }
            })
            if (collision)
                return res.status(403).send({ success: false })


            // Cria o usuário
            let body = {
                username: req.body.username,
                nickname: req.body.nickname,
                passwordDigest: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
            }

            await User.create(body)

            return res.send({ success: true })
        } catch (err) {
            console.error(err)
            return res.status(500).send({ 
                success: false, 
                message: 'error on api' 
            })
        }
    }
}