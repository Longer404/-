const user = require('./user/index')

module.exports = (app) => {
    app.use(user.routes());
};