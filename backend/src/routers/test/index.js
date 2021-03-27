const Router = require('@koa/router');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const multer = require('koa-multer')

const Test = mongoose.model('Test');
const Article = mongoose.model('Article');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var upload = multer({
    storage: storage
})

const router = new Router({
    prefix: '/upload'
});

router.post('/test', upload.single('file'), async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    // const {
    //     essay
    // } = context.request.body;
    // console.log(storage.fileFormat.filename)
    console.log(1)
    // console.log(context.req)
    
    // console.log(upload.filename)
    // context.res.send(context.req.file.filename)
    context.body = {
        filename: context.req.file.filename,
        url: `${context.origin}/${context.req.file.filename}`
        // msg:'成功'
        // url: `${context.origin}/upload/${filename}`
    }

    // 使用findOne方法查询User表中是否存在与前端传来的用户名相同的用户名
    // const one = await User.findOne({
    //     nickname: nickName,
    // }).exec();

    // 如果存在则返回以下信息
    // if (one) {
    //     context.body = {
    //         code: 0,
    //         msg: '已存在该用户',
    //         data: null,
    //     };
    //     return;
    // }

    // 将两个变量的值传给user的model以创建数据库信息
    // const test = new Test({
    //     essay: essay
    // });

    // const res = await test.save();
    
    // console.log(context.request.body);
    console.log(2)

    // context.body = {
    //     code: 1,
    //     msg: '成功',
    //     data: context.request.body,
    // };
});

router.post('/article', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        essay
    } = context.request.body;
    // console.log(storage.fileFormat.filename)
    console.log(essay)
    // console.log(context.req)
    
    // console.log(upload.filename)
    // context.res.send(context.req.file.filename)

    // context.body = {
    //     filename: context.req.file.filename,
    //     url: `${context.origin}/${context.req.file.filename}`
    //     // msg:'成功'
    //     // url: `${context.origin}/upload/${filename}`
    // }

    // 使用findOne方法查询User表中是否存在与前端传来的用户名相同的用户名
    // const one = await User.findOne({
    //     nickname: nickName,
    // }).exec();

    // 如果存在则返回以下信息
    // if (one) {
    //     context.body = {
    //         code: 0,
    //         msg: '已存在该用户',
    //         data: null,
    //     };
    //     return;
    // }

    // 将两个变量的值传给user的model以创建数据库信息
    // const test = new Test({
    //     essay: essay
    // });

    // const res = await test.save();
    
    // console.log(context.request.body);

    const article = new Article({
        author: essay.author,
        authorId: essay.authorId,
        title: essay.title,
        createAt: essay.createAt,
        coverUrl: essay.coverUrl,
        about: essay.about,
        content: essay.content,
        partition: essay.partition
    })
    const res = await article.save();

    console.log(2)

    context.body = {
        code: 1,
        msg: '发布成功',
        // data: context.request.body,
        data: res
    };
});

module.exports = router;