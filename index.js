require('dotenv').config()
const app = require('express')()
const auth = require('./middlewares/auth')
const port = process.env.PORT

var test = require('./models')
console.log(test)

app.get('/', auth, (req, res) => {
    res.send('Ola mundo')
})

app.post('/login', (req, res) => {
    res.send('ok')
})

app.listen(port)
