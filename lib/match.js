class Match {
    constructor(userId1, userId2) {
        this.player1 = {
            userId: userId1,
            choices: []
        }

        this.player2 = {
            userId: userId2,
            choices: [],
            opponent: this.player1
        }

        this.player1.opponent = this.player2
        this.turn = this.player1
        this.winner = null;
    }
    
    setChoice(number, player) {
        if (player.choices.includes(number) || player.opponent.choices.includes(number)) {
            return {
                success: false,
                message: 'unavailable choice'
            }
        }

        if (this.turn != player || this.winner) {
            return {
                success: false,
                message: 'wrong turn'
            }
        }

        player.choices.push(number)

        if (Match.isWinnerSet(player.choices)) {
            this.winner = player
            this.turn = null
            return {
                success: true,
                winner: true,
            }
        } else {
            this.turn = this.turn.opponent
            return {
                success: true,
                winner: false
            }
        }
    }

    getAvailable() {
        return [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].filter( n => !this.player1.choices.includes(n) && !this.player2.choices.includes(n))
    }

    static isWinnerSet(numberSet) {
        for (let i = 0; i < numberSet.length - 2; i++) {
            for (let j = 1; j < numberSet.length - 1; j++) {
                for (let k = 2; k < numberSet.length; k++) {
                    if (i + j + k === 15)
                        return true
                }
            }
        }
        return false;
    }
}

module.exports = Match