require('dotenv').config()
require('./models')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const auth = require('./middlewares/auth')
const router = require('./routers/indexRouter')
const matchMaker = require('./app/matchMaker')
const port = process.env.PORT

express()
    .use(morgan('dev'))
    .use(express.json({limit: '1500kb'}))
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    
    .use(router)
    .all('*', (req, res) => {
        return res.status(400).send()
    })

    .listen(port, matchMaker.main)
