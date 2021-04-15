const mongoose = require('mongoose');
// const { getMeta } = require('../helpers');

const CommentSchema = new mongoose.Schema({
    // 评论的从属对象
    commentFrom: String,
    // 评论者名字
    commentator: String,
    // 评论者头像
    commentatorAvatar: String,
    // 评论者id
    commentatorId: String,
    // 评论对象id(可以使文章id也可是评论id)
    // 如果对象时文章id则是文章的主评论
    // 如果是评论id，则是评论的回复
    commentTo: String,
    // 评论日期
    createAt: Number,
    // 评论内容
    content: String,
    // meta: getMeta(),
});

mongoose.model('Comment', CommentSchema);