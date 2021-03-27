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
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        page = 1,
        size = 5,
    } = context.query;

    console.log(1)
    // const article = new Article({
    //     title: '第一篇文章',
    //     author: 'longer',
    //     createAt: Date(),
    //     about: '这是第一篇文章的摘要',
    //     content: '这是第一篇文章的内容',
    // })
    // const res = await article.save();

    // 将数据库中article表的记录的总数传给total
    const total = await Article.countDocuments();
    // const list = await Article.find().exec();

    // 通过当前页码page和每页显示的数量，从数据库中取出响应的记录
    const list = await Article
        .find()
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    // 最后返回前端所需的数据
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

router.get('/:id', async (context) => {

    const {
        id,
    } = context.params;

    const one = await Article.findOne({
        _id: id,
    }).exec();

    if (!one) {
        context.body = {
            msg: '文章不存在',
            code: 0,
            data: null
        }
        return;
    }

    context.body = {
        msg: '查询成功',
        data: one,
        code: 1,
    }
});

router.get('/manager/:id', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        id,
    } = context.params;

    const list = await Article.find({
        authorId: id,
    }).exec();

    if (!list) {
        context.body = {
            code: 1,
            msg: '还没有任何投稿',
            data: null,
        };
    }

    console.log('list')
    

    // 最后返回前端所需的数据
    context.body = {
        code: 1,
        msg: '获取成功',
        data: {
            // total,
            // page,
            // size,
            list,
        }
    };
});

router.delete('/:id', async (context) => {
    const {
        id,
    } = context.params;

    const delMsg = await Article.deleteOne({
        _id: id,
    });
    console.log('删除成功');
    context.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    };
});

module.exports = router;