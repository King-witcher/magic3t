require('dotenv').config()
require('./models')
const express = require('express')
const morgan = require('morgan')

const auth = require('./middlewares/auth')
const router = require('./routers/indexRouter')
const port = process.env.PORT


express()
    .use(morgan('dev'))
    .use(express.json({limit: '1500kb'}))
    .use(express.urlencoded({ extended: false }))
    
    .use(router)

    .get('/', auth, (req, res) => { return res.send('Ola mundo') })

    .listen(port)
