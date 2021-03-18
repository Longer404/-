const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const ArticleSchema = new mongoose.Schema({
    title: String,
    author: String,
    createAt: String,
    about: String,
    content: String,
    meta: getMeta(),
});

mongoose.model('Article', ArticleSchema);