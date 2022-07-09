const AbstractController = require('./abstractController')
const Match = require('../lib/match')

module.exports = class MatchController extends AbstractController {

    static currentMatches = []
    static playerMatchIndex = {}

    // Processa uma solicitação de escolha de número
    static async makeChoice(req, res) {

    }

    // Processa uma solicitação de rendição
    static async forfeit(req, res) {

    }

    // Retorna informações da partida e do seu estado
    static async matchInfo(req, res) {

    }

    static async createMatch() {
        
    }
}