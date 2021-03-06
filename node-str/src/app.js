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
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')

// Middleware
app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({
    extended: false
}))

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// Middleware routes
app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app