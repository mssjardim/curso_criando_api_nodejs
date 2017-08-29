'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
}

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
}

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
}

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
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

    repository
        .post(req.body)
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
    repository
        .put(req.params.id, req.body)
        .then(x => {
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
    repository
        .delete(req.body.id)
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