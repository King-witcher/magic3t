const AbstractController = require('./abstractController')
const matchSet = require('../app/matchSet')
const queue = require('../app/queue')

module.exports = class MatchMakingController extends AbstractController {

    // Entra na fila pra ver se acha alguém
    static enqueue(req, res) {
        let uid = req.userId

        if (queue.enqueued[uid])
            return super.response(res, MatchMakingController._getQueueStatus(uid))

        if (matchSet.set[uid])
            return super.responseError(res, 403, 'already in a match')
        
        queue.enqueue(uid)

        console.log(uid, 'enqueued')
        console.log('queue', queue.enqueued)

        return super.response(res, MatchMakingController._getQueueStatus(uid))
    }

    // Sai da fila
    static dequeue(req, res) {
        let uid = req.userId

        if (!queue.enqueued[uid])
            return super.response(res, MatchMakingController._getQueueStatus(uid))

        queue.dequeue(uid)

        console.log(uid, 'dequeued')
        console.log('queue', queue.enqueued)

        return super.response(res, MatchMakingController._getQueueStatus(uid))
    }

    // Verifica o estado atual da fila
    static check(req, res) {
        let uid = req.userId

        return super.response(res, MatchMakingController._getQueueStatus(uid))
    }

    static _getQueueStatus(uid) {
        // Na fila
        if(queue.enqueued[uid])
            return {
                enqueued: true,
                matchStarted: false,
                ...queue.enqueued[uid],
            }

        // Aceito
        else if(queue.accepted[uid]) {
            delete queue.accepted[uid]
            return {
                enqueued: false,
                matchStarted: true,
            }
        }

        // Fora da fila
        else
            return {
                enqueued: false,
                matchStarted: false,
            }
    }
}