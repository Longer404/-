const user = require('./user/index');
const draft = require('./draft/index');
const article = require('./article/index');
const uploadmanager = require('./test/index');

module.exports = (app) => {
    app.use(user.routes());
    app.use(draft.routes());
    app.use(article.routes());
    app.use(uploadmanager.routes());
};
