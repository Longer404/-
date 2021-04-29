const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    phone: String,
    userAvatar: {
        type: String,
        default: 'http://localhost:3000/1616593710560.png'
    },
    note: {
        type: String,
        default: '该用户还未填写个性签名~'
    },
    character: String,
    characterTitle: String,
    collect: [String],
    following: [String],
    beFollowed: [String],
    power: {
        type: String,
        default: '1',
    },
    reputation:{
        type: Number,
        default: 100
    },
    read: {
        type: Number,
        default: 0
    },
    meta: getMeta(),
});

mongoose.model('User', UserSchema);