const matchMakingRouter = require('../routers/matchMakingRouter')
const AbstractController = require('./abstractController')

module.exports = class MatchMakingController extends AbstractController {

    static enqueuedPlayers = []

    static async postRequest(req, res) {

        if (req.body.method === 'enqueue')
            return MatchMakingController.enqueue(req, res)

        return super.responseError(res, 500, 'not implemented')
    }

    // Entra na fila pra ver se acha alguém
    static async enqueue(req, res) {
        return super.responseError(res, 500, 'not implemented23')
    }

    // Sai da fila
    static async dequeue(req, res) {

    }

    // Verifica se encontrou alguém e, se tiver encontrado, inicia a partida e retorna informações.
    static async check(req, res) {

    }
}