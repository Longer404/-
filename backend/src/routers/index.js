const user = require('./user/index')

module.exports = (app) => {
    app.use(user.routes());
};

const test = require('./test/index')

module.exports = (app) => {
    app.use(test.routes());
};

const article = require('./article/index')

module.exports = (app) => {
    app.use(article.routes());
};
