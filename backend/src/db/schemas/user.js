const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    phone: String,
    userAvatar: String,
    character: String,
    characterTitle: String,
    collect: [String],
    power: {
        type: String,
        default: '1',
    },
    meta: getMeta(),
});

mongoose.model('User', UserSchema);