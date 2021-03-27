const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    email: String,
    userAvatar: String,
    collect: [String],
    meta: getMeta(),
});

mongoose.model('User', UserSchema);