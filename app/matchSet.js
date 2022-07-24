const Match = require('../lib/match')

module.exports = {
    set: {},
    count: 0,
    
    create(playerId1, playerId2) {
        let match = new Match(playerId1, playerId2)
        this.set[playerId1] = this.set[playerId2] = match
        this.count++
    },

    delete(playerId) {
        let match = this.set[playerId]
        delete this.set[match.playerId1]
        delete this.set[match.playerId2]
        this.count--
    }
}