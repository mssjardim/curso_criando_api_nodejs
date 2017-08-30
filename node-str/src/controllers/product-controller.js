'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')
const guid = require('guid')

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}

exports.post = async (req, res, next) => {

    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, "Título deve conter no mínimo 3 caracteres", "Título")

    if (!contract.isValid()) {
        res.status(200).send(contract.errors()).end()
        return;
    }

    // prepair image
    let rawdata = req.body.image
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    let type = matches[1]
    let filename = guid.raw().toString() + "." + type.toString().split("/")[1]
    // let buffer = new Buffer(matches[2], 'base64')
    
    try {
        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: { filename : filename, fileData: rawdata }
        })
        res.status(201).send({
            message: 'Product created successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Failed to create product',
            data: error
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Product updated sucessfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Failed to updated product',
            data: error
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Product removed sucessfully'
        })
    } catch (error) {
        res.status(400).send({
            message: 'Failed to removed product',
            data: e
        })
    }
}