const AbstractController = require('./abstractController')
const Match = require('../lib/match')

module.exports = class MatchController extends AbstractController {

    static matches = { 
        '1': new Match(3, 1)
    }

    // Processa uma solicitação de escolha de número
    static async makeChoice(req, res) {

    }

    // Processa uma solicitação de rendição
    static async forfeit(req, res) {

    }

    // Retorna informações da partida e do seu estado
    static async matchInfo(req, res) {
        let matches = MatchController.matches
        matches[1].setChoice(4, matches[1].player1)
        matches[1].setChoice(5, matches[1].player2)

        let match = matches[req.userId]
        if (match) {
            let payload = { }

            payload.available = match.getAvailable()

            let you
            if (req.userId == match.player1.userId) {
                you = match.player1
            } else {
                you = match.player2
            }
            let opponent = you.opponent

            payload.yourChoices = you.choices
            payload.opponentChoices = opponent.choices
            
            if (match.turn == you) {
                payload.yourTurn = true
            } else {
                payload.yourTurn = false
            }

            return super.response(res, payload)
        }
        else return super.responseError(res, 404, 'no match found')
    }



    static createMatch(playerId1, playerId2) {
        let matches = MatchController.matches
        let match = new Match(playerId1, playerId2)
        matches[playerId1] = matches[playerId2] = match
    }

    static deleteMatch(uid) {
        let match = MatchController.matches[uid]
        delete matches[match.playerId1]
        delete matches[match.playerId2]
    }
}