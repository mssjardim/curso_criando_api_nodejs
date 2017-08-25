'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const env = require('../.env')

const app = express()
const router = express.Router()

// Connect to database
mongoose.connect('mongodb://' + env.db.user + ':' + env.db.password + '@ds157873.mlab.com:57873/ndstr')


// Load routes
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


app.use('/', indexRoute)
app.use('/products', productRoute)

module.exports = app