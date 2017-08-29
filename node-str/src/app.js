'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const env = require('../.env')

const app = express()
const router = express.Router()

// Connect to database
mongoose.connect(env.mongodb.uri)

// Load models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

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