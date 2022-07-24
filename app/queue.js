module.exports = {
    enqueued: {},
    accepted: {},
    count: 0,
    
    enqueue(userId) {
        this.enqueued[userId] = {
            timestamp: Date.now(),
            mmr: 0.0,
            ready: false,
        }
        this.count++
    },

    dequeue(userId) {
        delete this.enqueued[userId]
        this.count--
    },

    pickPair() {
        if (this.count < 2)
            return null

        let player1 = this._pickOldest()
        let player2 = this._pickOldest()
        
        return { player1, player2 }
    },

    _pickOldest() {
        let oldest = null
        let oldestTimestamp = Infinity
        let oldestId
        for (const uid in this.enqueued) {
            let current = this.enqueued[uid]
            if (current.timestamp < oldestTimestamp) {
                oldest = current
                oldestTimestamp = current.timestamp
                oldestId = uid
            }
        }
        this.dequeue(oldestId)
        return oldestId
    },
}