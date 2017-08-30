'use strict'

const env = require('../../.env')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(env.SENDGRID_API_KEY);
exports.send =(to, from, subject, body) => {
    const msg = {
        to: to,
        from: 'test@example.com',
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: body,
    }
    sgMail.send(msg);
}