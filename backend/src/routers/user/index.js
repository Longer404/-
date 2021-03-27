const Router = require('@koa/router');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../project.config')
const { verify, getToken } =require('../../helpers/token')

const User = mongoose.model('User');

const router = new Router({
    prefix: '/user'
});

router.post('/register', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        email,
        nickName,
        password,
    } = context.request.body;
    console.log(context)

    // 使用findOne方法查询User表中是否存在与前端传来的用户名相同的用户名
    const one = await User.findOne({
        nickname: nickName,
    }).exec();

    // 如果存在则返回以下信息
    if (one) {
        context.body = {
            code: 0,
            msg: '已存在该用户',
            data: null,
        };
        return;
    }

    // 将两个变量的值传给user的model以创建数据库信息
    const user = new User({
        email: email,
        nickname: nickName,
        password: password,
    });

    const res = await user.save();
    console.log(1)
    console.log(context.request.body);
    console.log(2)

    context.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    };
});

router.post('/login', async (context) => {
    // context.body = '登录成功';
    const {
        email,
        password,
    } = context.request.body;

    if (email === '' || password === '') {
        context.body = {
            code: 0,
            msg: '字段不能为空',
            data: null
        }
    }
    // console.log(email,password)
    
    const one = await User.findOne({
        email,
    }).exec();

    if (!one) {
        context.body = {
            code: 0,
            msg: '用户名或密码错误',
            data: null,
        };
        return;
    }

    const user = {
        nickname: one.nickname,
        email: one.email,
        _id: one._id,
        userAvatar: one.userAvatar,
    };

    if (one.password === password) {
        context.body = {
            code: 1,
            msg: '登录成功',
            data: {
                user,
                token: jwt.sign(user, config.JWT_SECRET),
            },
        };
        return;
    }

    context.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };
});

router.get('/info', async (context) => {
    context.body = {
        data: await verify(getToken(context)),
        code: 1,
        msg: '获取成功',
    }
    
});

router.post('/update', async (context) => {
    // context.body = '登录成功';
    const {
        id,
        nickname,
        userAvatar,
    } = context.request.body;

    console.log(nickname + userAvatar)
    
    const one = await User.findOne({
        _id: id
    }).exec();

    if (!one) {
        context.body = {
            code: 0,
            msg: '未找到用户',
            data: null,
        };
        return;
    }

    if (nickname) {
        one.nickname = nickname
    }

    if (userAvatar) {
        one.userAvatar = userAvatar  
    }

    await one.save();
    const user = {
        nickname: one.nickname,
        email: one.email,
        _id: one._id,
        userAvatar: one.userAvatar,
    };

    context.body = {
        code: 1,
        msg: '修改成功',
        data: {
            user,
            token: jwt.sign(user, config.JWT_SECRET),
        },
    };
    return;

});

router.post('/collection', async (context) => {
    const {
        id,
    } = context.request.body;

    const one = await User.findOne({
        _id: id
    }).exec();

    console.log(one);
    one.collect.push('33','55');
    console.log(one.collect);

    context.body = {
        code: 1,
        msg: '测试成功',
        data: null,
    }
})

module.exports = router;