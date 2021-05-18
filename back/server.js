const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = process.env.PORT || 3000;

require('dotenv').config()

app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.header('origin'))
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// Cors
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// Body-Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// ROUTER
const ROUTER = require('./router/routes')
app.use('/api', ROUTER)

// Ecoute de notre app
app.listen(port, () => {
    console.log('le serveur tourne sur le port: ' + port)
})