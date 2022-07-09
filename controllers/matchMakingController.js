const AbstractController = require('./abstractController')

module.exports = class MatchMakingController extends AbstractController {

    // Entra na fila pra ver se acha alguém
    async enqueue(req, res) {
        
    }

    // Sai da fila
    async dequeue(req, res) {

    }

    // Verifica se encontrou alguém e, se tiver encontrado, inicia a partida e retorna informações.
    async check(req, res) {

    }
}