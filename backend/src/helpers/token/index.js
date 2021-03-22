const jwt = require('jsonwebtoken');
// const { resolve } = require('node:path');
const config = require('../../project.config')

const getToken = (context) => {
    let { authorization } = context.header;

    return authorization.replace('Bearer ', '').replace('bearer ', '');
}

const verify = (token) => {
    return new Promise((resolve, rejects) => {
        jwt.verify(token, config.JWT_SECRET, (err, payload) => {
            if (err) {
                rejects(err);
                return;
            }
            resolve(payload);
        });
    });
};

module.exports = {
    verify,
    getToken,
};