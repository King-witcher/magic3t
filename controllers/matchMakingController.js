const Match = require('../lib/match')
const AbstractController = require('./abstractController')

module.exports = class MatchMakingController extends AbstractController {

    // Jogadores que estão na fila, indexados por userId
    static queue = {}

    // Entra na fila pra ver se acha alguém
    static enqueue(req, res) {
        let queue = MatchMakingController.queue

        if (queue[req.userId])
            return this.responseError(res, 304, [])

        queue[req.userId] = {
            timestamp: Date.now(),
            mmr: 0.0,
            ready: false,
        }

        console.log(req.userId, 'enqueued')
        console.log('queue', queue)

        return super.response(res, '')
    }


    // Sai da fila
    static dequeue(req, res) {
        let queue = MatchMakingController.queue

        if (!queue[req.userId])
            return this.responseError(res, 304, [])

        this._dequeue(req.userId)

        console.log(req.userId, 'dequeued')
        console.log('queue', queue)

        return this.response(res, '')
    }

    static check(req, res) {
        let queue = MatchMakingController.queue
        if(queue[req.userId])
            return super.response(res, {
                enqueued: true,
                ...queue[req.userId],
            })
        else
            return super.response(res, {
                enqueued: false,
            })
    }

    static _dequeue(userId) {
        delete MatchMakingController.queue[userId]
    }
}