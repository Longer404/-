const Router = require('@koa/router');
const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

const router = new Router({
    prefix: '/comment'
});

router.post('/post', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        essay
    } = context.request.body;
    // console.log(storage.fileFormat.filename)
    console.log(essay);

    const one = await User.findOne({
        _id: essay.commentatorId
    }).exec();
    if(one.power === '2' || one.power === '4') {
        context.body = {
            code: 0,
            msg: '你的账号已被禁止评论',
            // data: context.request.body,
            data: null
        };
        return;
    }

    const comment = new Comment({
        commentator: essay.nickname,
        commentatorAvatar: essay.userAvatar,
        commentFrom: essay.commentFrom,
        commentatorId: essay.commentatorId,
        commentTo: essay.commentTo,
        createAt: (new Date()).getTime(),
        content: essay.content,
    })
    const res = await comment.save();

    console.log('comment');

    context.body = {
        code: 1,
        msg: '评论成功',
        // data: context.request.body,
        data: res
    };
});

router.get('/list', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const { commentTo } = context.query;

    // console.log(typeof examined);

    // 创建一个动态的对象数组，通过评论者id获取该评论者的昵称和头像
    // var commentDetailList = [];

    // const commentList = await Comment.find({
    //     commentTo: commentTo,
    // }).exec();
    
    // for(let i = 0; i < commentList.length; i++) {
    //     const commentUser = await User.findOne({
    //         _id: commentList[i].commentatorId,
    //     });
    //     console.log(commentUser.nickname);
    //     console.log(commentUser.userAvatar);
    //     commentDetailList[i] = new Object();
    //     commentDetailList[i].commentatorName = commentUser.nickname;
    //     commentDetailList[i].commentatorAvatar = commentUser.userAvatar;
    //     commentDetailList[i].commentFrom = commentList[i].commentFrom;
    //     commentDetailList[i].commentTo = commentList[i].commentTo;
    //     commentDetailList[i].createAt = commentList[i].createAt;
    //     commentDetailList[i].content = commentList[i].content;
    // }
    
    // console.log()

    const commentList = await Comment.find({
        commentTo: commentTo,
    }).exec();

    context.body = {
        code: 1,
        msg: '获取成功',
        data: commentList,
    };
});

router.get('/byUserId', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const { commentatorId } = context.query;

    const commentList = await Comment.find({
        commentatorId: commentatorId,
    }).exec();

    context.body = {
        code: 1,
        msg: '获取成功',
        data: commentList,
    };
});

router.get('/replylist', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const { commentTo } = context.query;

    // console.log(typeof examined);

    const commentList = await Comment.find({
        commentTo: commentTo,
    }).exec();

    context.body = {
        code: 1,
        msg: '获取成功',
        data: commentList,
    };
});

router.get('/table', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    // const { commentTo } = context.query;
    const {
        page = 1,
    } = context.query;
    // console.log(typeof examined);
    let {
        size = 10,
    } = context.query;
    size = Number(size);
    // const commentList = await Comment.find({
    //     commentTo: commentTo,
    // }).exec();

    const list = await Comment
        .find()
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await Comment.countDocuments();
    // context.body = {
    //     code: 1,
    //     msg: '获取成功',
    //     data: commentList,
    // };
    context.body = {
        code: 1,
        msg: '获取成功',
        data: {
            total,
            page,
            size,
            list,
        }
    };
});

module.exports = router;