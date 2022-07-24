const Match = require('../lib/match')
const AbstractController = require('./abstractController')
const matchSet = require('../app/matchSet')
const queue = require('../app/queue')

class MatchMakingController extends AbstractController {

    // Entra na fila pra ver se acha alguém
    static enqueue(req, res) {
        let uid = req.userId

        if (queue.enqueued[uid])
            return this.responseError(res, 304, [])

        queue.enqueue(uid)

        console.log(uid, 'enqueued')
        console.log('queue', queue.enqueued)

        return super.response(res, '')
    }

    // Sai da fila
    static dequeue(req, res) {
        let uid = req.userId

        if (!queue.enqueued[uid])
            return this.responseError(res, 304, [])

        queue.dequeue(uid)

        console.log(uid, 'dequeued')
        console.log('queue', queue.enqueued)

        return this.response(res, '')
    }

    // Verifica o estado atual da fila
    static check(req, res) {
        let uid = req.userId

        if(queue.enqueued[uid])
            return super.response(res, {
                enqueued: true,
                ...queue.enqueued[uid],
            })
        else
            return super.response(res, {
                enqueued: false,
            })
    }
}

module.exports = MatchMakingController