'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')

exports.post = async (req, res, next) => {

    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 3, "O nome deve conter no mínimo 3 caracteres", "Nome")
    contract.isEmail(req.body.email, "Email inválido", "Email")
    contract.hasMinLen(req.body.password, 6, "A senha deve conter no mínimo 6 caracteres", "Senha")

    if (!contract.isValid()) {
        res.status(200).send(contract.errors()).end()
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Customer created successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Failed to create customer',
            data: error
        })
    }
}