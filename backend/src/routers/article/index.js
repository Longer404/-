const Router = require('@koa/router');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

const Article = mongoose.model('Article');

const router = new Router({
    prefix: '/article'
});

router.post('/article', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    // const {
    //     email,
    //     nickName,
    //     password,
    // } = context.request.body;

    // 使用findOne方法查询User表中是否存在与前端传来的用户名相同的用户名
    // const one = await User.findOne({
    //     nickname: nickName,
    // }).exec();

    // // 如果存在则返回以下信息
    // if (one) {
    //     context.body = {
    //         code: 0,
    //         msg: '已存在该用户',
    //         data: null,
    //     };
    //     return;
    // }

    // 将两个变量的值传给user的model以创建数据库信息
    // const user = new User({
    //     email: email,
    //     nickname: nickName,
    //     password: password,
    // });

    // const res = await user.save();
    // console.log(1)
    // console.log(context.request.body);
    // console.log(2)

    context.body = {
        code: 1,
        msg: '注册成功',
        // data: res,
    };
});

router.get('/list', async (context) => {
    // context.body = '登录成功';
    // const {
    //     email,
    //     password,
    // } = context.request.body;

    // const one = await User.findOne({
    //     email,
    // }).exec();

    // if (!one) {
    //     context.body = {
    //         code: 0,
    //         msg: '用户名或密码错误',
    //         data: null,
    //     };
    //     return;
    // }

    // const user = {
    //     email: one.email,
    //     _id: one._id,
    // };

    // if (one.password === password) {
    //     context.body = {
    //         code: 1,
    //         msg: '登录成功',
    //         data: {
    //             user,
    //             token: jwt.sign(user, 'testdata'),
    //         },
    //     };
    //     return;
    // }
    console.log(1)
    // const article = new Article({
    //     title: '第一篇文章',
    //     author: 'longer',
    //     createAt: Date(),
    //     about: '这是第一篇文章的摘要',
    //     content: '这是第一篇文章的内容',
    // })
    // const res = await article.save();
    const list = await Article.find().exec();

    context.body = {
        code: 1,
        msg: '获取成功',
        data: list,
    };
});

module.exports = router;