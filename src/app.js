const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// inicializa as rotas
const indexRoute = require('./routes/index-route')
const g1Route = require('./routes/g1-route')
const cnnRoute = require('./routes/cnn-route')
const uolRoute = require('./routes/uol-routes')
const quotationRoute = require('./routes/quotation-route')
const weatherRoute = require('./routes/weather-route')


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
app.use('/api/news/g1', g1Route)
app.use('/api/news/cnn', cnnRoute)
app.use('/api/news/uol', uolRoute)
app.use('/api/quotation/mf', quotationRoute);
app.use('/api/weather', weatherRoute);

module.exports = app