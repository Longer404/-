const jwt = require('jsonwebtoken');
// const { resolve } = require('node:path');
const config = require('../../project.config')
const koajwt = require('koa-jwt')

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

const middleware = (app) => {
    app.use(koajwt({
        secret: config.JWT_SECRET,
    }).unless({
        path: [
            /^\/user\/login/,
            /^\/user\/register/,
        ],
    }));
};

const catchTokenError = async (context, next) => {
    return next().catch((error) => {
        if (error.status === 401) {
            context.status = 401;
            context.body = {
                code: 0,
                msg: 'token error',
            };
        } else {
            throw error;
        }
    });
};

module.exports = {
    verify,
    getToken,
    middleware,
    catchTokenError,
};