const matchSet = require('./matchSet')
const queue = require('./queue')

const capacity = 2
const pollingInterval = 7000

module.exports = {
    main: async () => {
        setInterval(() => {
            console.log()
            console.log(matchSet.count, 'matches running.')
            console.log(queue.count, 'players in the queue.')

            let available = capacity - matchSet.count
        
            for(let i = 0; i < available; i++){
                let pair = queue.pickPair()
                if(pair) {
                    matchSet.create(pair.player1, pair.player2)
                    console.log()
                    console.log("New match was created.")
                    console.log('Current matches:', matchSet.set)
                }
            }
        }, pollingInterval)
    }
}