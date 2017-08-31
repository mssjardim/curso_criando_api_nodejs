'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
const env = require('../../.env')
const authService = require('../services/auth-service')
const emailService = require('../services/email-service')

exports.post = async(req, res, next) => {

    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 3, "O nome deve conter no mínimo 3 caracteres", "Nome")
    contract.isEmail(req.body.email, "Email inválido", "Email")
    contract.hasMinLen(req.body.password, 6, "A senha deve conter no mínimo 6 caracteres", "Senha")

    if (!contract.isValid()) {
        res.status(200).send(contract.errors()).end()
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + env.SALT_KEY),
            roles: ["user"]
        })

        // send email
        let templateEmail = "Olá, <strong>{0}</strong>, seja bem vindo à Node Store"
        emailService.send(
            req.body.email,
            'Bem vindo ao Node Store',
            templateEmail.replace('{0}', req.body.name)
        )

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

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + env.SALT_KEY)
        })

        if (!customer) {
            res.status(404).send({
                message: 'User or password not valid'
            })
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        })

    } catch (error) {
        res.status(500).send({
            message: 'Failed to aunthenticated',
            data: error
        })
    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token)

        const customer = await repository.getById(data.id)

        if (!customer) {
            res.status(404).send({
                message: 'Customer not found'
            })
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        })

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        })

    } catch (error) {
        res.status(500).send({
            message: 'Failed to aunthenticated',
            data: error
        })
    }
}