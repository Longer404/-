const user = require('./user/index');
const test = require('./test/index');
const article = require('./article/index');

module.exports = (app) => {
    app.use(user.routes());
    app.use(test.routes());
    app.use(article.routes());
};
