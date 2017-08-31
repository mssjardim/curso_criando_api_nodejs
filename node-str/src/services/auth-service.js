'use strict'

const jwt = require('jsonwebtoken')
const env = require('../../.env')

exports.generateToken = async(data) => {
    return await jwt.sign(data, env.SALT_KEY, {
        expiresIn: '1d'
    })
}

exports.decodeToken = async(token) => {
    let data = await jwt.verify(token, env.SALT_KEY)
    return data
}

exports.authorize = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Not authorized'
        });
    } else {
        jwt.verify(token, env.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Invalid'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Not authorized'
        });
    } else {
        jwt.verify(token, env.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Invalid'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next()
                } else {
                    res.status(403).json({
                        message: 'Functionality restricted to administrators'
                    });
                }
            }
        })
    }
}