require('dotenv').config()
require('./models')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const auth = require('./middlewares/auth')
const routes = require('./routes')
const matchMaker = require('./app/matchMaker')
const port = process.env.PORT

express()
    .use(morgan('dev'))
    .use(express.json({limit: '1500kb'}))
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    
    .use(routes)
    .all('*', (req, res) => {
        return res.status(404).send()
    })

    .listen(port, matchMaker.main)
