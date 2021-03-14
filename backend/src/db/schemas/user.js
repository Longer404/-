const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    email: String,
    meta: getMeta(),
});

mongoose.model('User', UserSchema);