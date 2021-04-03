const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const ArticleSchema = new mongoose.Schema({
    title: String,
    author: String,
    authorId: String,
    createAt: String,
    coverUrl: String,
    about: String,
    content: String,
    partition: String,
    examined:{
        type: String,
        default: 'examining',
    },
    likes: {
        type: Number,
        default: 0,
    },
    read: {
        type: Number,
        default: 0,
    },
    meta: getMeta(),
});

mongoose.model('Article', ArticleSchema);