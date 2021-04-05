const Router = require('@koa/router');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../project.config')
const { verify, getToken } =require('../../helpers/token')

const User = mongoose.model('User');
const Character = mongoose.model('Character');

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

    // 使用findOne方法查询User表中是否存在与前端传来的邮箱相同的邮箱
    const two = await User.findOne({
        email: email,
    }).exec();

    // 如果存在则返回以下信息
    if (two) {
        context.body = {
            code: 0,
            msg: '该邮箱已被绑定',
            data: null,
        };
        return;
    }
    const member = await Character.findOne({
        title: '普通用户',
    });

    // 将两个变量的值传给user的model以创建数据库信息
    const regiuser = new User({
        email: email,
        nickname: nickName,
        password: password,
        character: member._id,
    });

    const res = await regiuser.save();
    console.log(res);
    
    // 生成token返回给前端
    const data = {
        nickname: res.nickname,
        email: res.email,
        _id: res._id,
        userAvatar: res.userAvatar,
        character: res.character,
    };

    context.body = {
        code: 1,
        msg: '注册成功',
        data: {
            data,
            token: jwt.sign(data, config.JWT_SECRET),
        },
    };
    // return;
    

    // context.body = {
    //     code: 1,
    //     msg: '注册成功',
    //     data: res,
    // };
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

    const data = {
        nickname: one.nickname,
        email: one.email,
        _id: one._id,
        userAvatar: one.userAvatar,
        character: one.character,
    };

    if (one.password === password) {
        context.body = {
            code: 1,
            msg: '登录成功',
            data: {
                data,
                token: jwt.sign(data, config.JWT_SECRET),
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

router.get('/table/:type', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        type,
    } = context.params;

    const {
        page = 1,
        
    } = context.query;

    let {
        size = 10,
    } =context.query;

    size = Number(size);
    
    console.log('get user list')

    // 将数据库中article表的记录的总数传给total
    const total = await User.countDocuments();
    // const list = await Article.find().exec();

    // 通过当前页码page和每页显示的数量，从数据库中取出响应的记录
    if (type === 'id') {
        console.log('byID');
        var list = await User
            .find()
            .sort({
                _id: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }
    if (type === 'nickname') {
        console.log('byNickname');
        var list = await User
            .find()
            .sort({
                nickname: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }
    if (type === 'createAt') {
        console.log('byCAt');
        var list = await User
            .find()
            .sort({
                "meta.createdAt": -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }
    

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

module.exports = router;