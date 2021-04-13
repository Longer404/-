const user = require('./user/index');
const draft = require('./draft/index');
const article = require('./article/index');
const uploadmanager = require('./test/index');
const character = require('./character/index');
const comment = require('./comment/index');
const message = require('./message/index')

module.exports = (app) => {
    app.use(user.routes());
    app.use(draft.routes());
    app.use(article.routes());
    app.use(uploadmanager.routes());
    app.use(character.routes());
    app.use(comment.routes());
    app.use(message.routes());
};
