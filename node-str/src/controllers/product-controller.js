'use strict'
const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const ValidationContract = require('../validators/fluent-validator')

exports.get = (req, res, next) => {
    Product
        .find({
            active: true
        }, 'title price slug')
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
}

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
}

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
}

exports.post = (req, res, next) => {

    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, "Título deve conter no mínimo 3 caracteres", "Título")

    if (!contract.isValid()) {
        res.status(200).send(contract.errors()).end()
        return;
    }

    let product = new Product(req.body)
    product.save()
        .then(x => {
            res.status(201).send({
                message: 'Product created successfully'
            })
        }).catch(e => {
            res.status(400).send({
                message: 'Failed to create product',
                data: e
            })
        });
}

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(x => {
            res.status(200).send({
                message: 'Product updated sucessfully'
            })
        }).catch(e => {
            res.status(400).send({
                message: 'Failed to updated product',
                data: e
            })
        })
}

exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Product removed sucessfully'
            })
        }).catch(e => {
            res.status(400).send({
                message: 'Failed to removed product',
                data: e
            })
        })
}