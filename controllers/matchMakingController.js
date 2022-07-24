const matchSet = require('../app/matchSet')
const queue = require('../app/queue')

module.exports = {
    // Entra na fila pra ver se acha alguém
    enqueue(req, res) {
        let uid = req.userId

        if (matchSet.set[uid])
            return res.status(403).send(getPlayerStatus(req.userId))

        if (!queue.enqueued[uid]) {
            queue.enqueue(uid)
            console.log('user', uid, 'enqueued')
            console.log('queue', queue.enqueued)
        }

        return res.send(getPlayerStatus(req.userId))
    },

    // Sai da fila
    dequeue(req, res) {
        let uid = req.userId

        if (queue.enqueued[uid]) {
            queue.dequeue(uid)
            console.log('user', uid, 'dequeued')
            console.log('queue', queue.enqueued)
        }

        return res.send(getPlayerStatus(req.userId))
    },

    // Verifica o estado atual da fila
    getStatus(req, res) {
        return res.send(getPlayerStatus(req.userId))
    },
}


// Helpers
function getPlayerStatus(uid) {
    // Na fila
    if(queue.enqueued[uid])
        return {
            enqueued: true,
            playing: false,
        }

    // Em partida
    else if(matchSet.set[uid]) {
        return {
            enqueued: false,
            playing: true,
        }
    }

    // Inativo
    else
        return {
            enqueued: false,
            playing: false,
        }
}