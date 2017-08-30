'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

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

    try {
        await repository.create(req.body)
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