const matchSet = require('../app/matchSet')
const queue = require('../app/queue')

module.exports = {

    // Processa uma solicitação de escolha de número
    makeChoice(req, res) {

    },

    // Processa uma solicitação de rendição
    async forfeit(req, res) {

    },

    // Retorna informações da partida e do seu estado
    async matchInfo(req, res) {
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
    },
}