require('dotenv').config()
const app = require('express')()
const port = process.env.PORT

console.log("environment is", process.env.ENVIRONMENT)

app.get('/', (req, res) => {
    res.send('Ola mundo')
})

app.listen(port)