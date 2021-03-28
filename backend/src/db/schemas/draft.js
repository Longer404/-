const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const DraftSchema = new mongoose.Schema({
    title: String,
    author: String,
    authorId: String,
    createAt: String,
    coverUrl: String,
    about: String,
    content: String,
    partition: String,
    meta: getMeta(),
});

mongoose.model('Draft', DraftSchema);