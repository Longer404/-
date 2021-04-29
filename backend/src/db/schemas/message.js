const mongoose = require('mongoose');
// const { getMeta } = require('../helpers');

const MessageSchema = new mongoose.Schema({
    // 消息来源
    messageFrom: String,
    // 来源id
    messageFromId: String,
    // 消息去向
    messageTo: String,
    // 去向id
    messageToId: String,
    // 消息的对象
    messageAbout: String,
    // 消息创建日期
    createAt: Number,
    // 消息内容
    content: String,
    // meta: getMeta(),
    // 消息标题
    title: String,
    // 举报者
    reporter: String,
    // 举报者id
    reporterId: String,
    // 消息类型
    messageType: {
        type: String,
        default: 'message',
    }
});

mongoose.model('Message', MessageSchema);