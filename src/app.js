const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// inicializa as rotas
const indexRoute = require('./routes/index-route')
const g1Route = require('./routes/g1-route')
const cnnRoute = require('./routes/cnn-route')
const uolRoute = require('./routes/uol-routes')
const mf = require('./routes/mercadofinanceiro-route')

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(bodyParser.json({
  limit: '5mb'
}))

// habilitando o cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use('/', indexRoute)
app.use('/api/g1', g1Route)
app.use('/api/cnn', cnnRoute)
app.use('/api/uol', uolRoute)
app.use('/api/mercadofinanceiro', mf);



module.exports = app