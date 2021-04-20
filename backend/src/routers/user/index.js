const Router = require('@koa/router');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../project.config')
const { verify, getToken } =require('../../helpers/token')

const User = mongoose.model('User');
const Character = mongoose.model('Character');
const Article = mongoose.model('Article');

const router = new Router({
    prefix: '/user'
});

router.post('/register', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        phone,
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
        phone: phone,
    }).exec();

    // 如果存在则返回以下信息
    if (two) {
        context.body = {
            code: 0,
            msg: '该号码已被绑定',
            data: null,
        };
        return;
    }
    const member = await Character.findOne({
        title: '普通用户',
    });

    // 将两个变量的值传给user的model以创建数据库信息
    const regiuser = new User({
        phone: phone,
        nickname: nickName,
        password: password,
        character: member._id,
        characterTitle: member.title,
    });

    const res = await regiuser.save();
    console.log(res);
    
    // 生成token返回给前端
    const data = {
        nickname: res.nickname,
        phone: res.phone,
        _id: res._id,
        userAvatar: res.userAvatar,
        character: res.character,
        power: res.power,
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
        phone,
        password,
    } = context.request.body;

    if (phone === '' || password === '') {
        context.body = {
            code: 0,
            msg: '字段不能为空',
            data: null
        }
    }
    // console.log(email,password)
    
    const one = await User.findOne({
        phone,
    }).exec();

    if (!one) {
        context.body = {
            code: 0,
            msg: '手机号或密码错误',
            data: null,
        };
        return;
    }

    const data = {
        nickname: one.nickname,
        phone: one.phone,
        _id: one._id,
        userAvatar: one.userAvatar,
        character: one.character,
        power: one.power,
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
        msg: '手机号或密码错误',
        data: null,
    };
});

router.get('/info', async (context) => {
    const data = await (verify(getToken(context)));
    const one = await User.findOne({
        _id: data._id
    }).exec();
    // console.log(one);
    let isChange = false;
    if (data.phone !== one.phone) {
        isChange = true;
        console.log(11);
    } 
    if (data.power !== one.power){
        isChange = true;
        console.log(22);
    } 
    if (data.nickname !== one.nickname) {
        isChange = true;
        console.log(33);
    } 
    

    if (isChange) {
        context.body = {
            data: null,
            code: 0,
            msg: 'token过期',
        }
        return;
    }    
    context.body = {
        data: await verify(getToken(context)),
        code: 1,
        msg: '获取成功',
    }
    
});

router.get('/detail/:id', async (context) => {
    const {
        id,
    } = context.params;

    const one = await User.findOne({
        _id: id
    }).exec();

    if(!one) {
        context.body = {
            data: null,
            code: 0,
            msg: '获取失败',
        }
    }
    context.body = {
        data: {
            nickname: one.nickname,
            phone: one.phone,
            power: one.power,
        },
        code: 1,
        msg: '获取成功',
    }
});

router.post('/resetpass', async (context) => {
    const {
        id,
    } = context.request.body;

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

    one.password = '123456';
    await one.save();
    context.body = {
        code: 1,
        msg: '重置成功',
        data: null
    };
    return;
});

router.post('/update', async (context) => {
    // context.body = '登录成功';
    const {
        id,
        nickname,
        userAvatar,
        phone,
        power,
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

    const userLikeNickname = await User.findOne({
        nickname: nickname
    }).exec();

    if (userLikeNickname) {
        context.body = {
            code: 0,
            msg: '该用户名已存在',
            data: null,
        };
        return;
    } else if(nickname) {
        one.nickname = nickname
    }

    if (userAvatar) {
        one.userAvatar = userAvatar  
    }

    const userLikePhone = await User.findOne({
        phone: phone
    }).exec();

    if (userLikePhone) {
        context.body = {
            code: 0,
            msg: '该手机号已绑定',
            data: null,
        };
        return;
    } else if(phone) {
        one.phone = phone
    }

    if (power) {
        one.power = power  
    }

    await one.save();
    const user = {
        nickname: one.nickname,
        phone: one.phone,
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

router.get('/search', async (context) => {
    const {
        keyword
    } = context.query;

    var userList = await User.find({
        nickname: {$regex: keyword}
    }).exec();

    if(!userList) {
        context.body = {
            code: 0,
            msg: '没有搜索结果',
            data: null
        }
        return;
    }
    context.body = {
        code: 1,
        msg: '搜索成功',
        data: userList
    }
});

router.delete('/:id', async (context) => {
    const {
        id,
    } = context.params;

    const delMsg = await User.deleteOne({
        _id: id,
    });
    console.log('删除成功');
    context.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    };
});

router.post('/updatepass', async (context) => {
    // context.body = '登录成功';
    const {
        id,
        password
    } = context.request.body;

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
    if (password === one.password) {
        context.body = {
            code: 0,
            msg: '新密码不能与旧密码相同，请重新设置新密码',
            data: null,
        };
        return;
    } else {
        one.password = password
        await one.save();
    }
    context.body = {
        code: 1,
        msg: '修改成功',
        data: null
    };
    return;
});

router.post('/updatephone', async (context) => {
    // context.body = '登录成功';
    const {
        id,
        phone
    } = context.request.body;

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

    const tow = await User.findOne({
        phone: phone
    }).exec();

    if (phone === one.phone) {
        context.body = {
            code: 0,
            msg: '新手机不能与旧手机相同，请重新改绑手机',
            data: null,
        };
        return;
    } else if (tow) {
        context.body = {
            code: 0,
            msg: '您改绑的新手机号已被绑定，请重新改绑手机',
            data: null,
        };
        return;
    } else {
        one.phone = phone
        await one.save();
    }
    context.body = {
        code: 1,
        msg: '修改成功',
        data: null
    };
    return;
});

router.post('/collect', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        userid,
        articleid
    } = context.request.body;

    const oneUser = await User.findOne({
        _id: userid,
    }).exec();

    const flag = oneUser.collect.indexOf(articleid);

    // 不等于-1则表示存在，flag为索引（下标
    if(flag !== -1){
        oneUser.collect.remove(articleid);
        await oneUser.save();
        context.body = {
            code: 1,
            msg: '取消收藏成功',
            data: null
        };
    } else if(flag === -1) {
        oneUser.collect.push(articleid);
        await oneUser.save();
        context.body = {
            code: 1,
            msg: '收藏成功',
            data: null
        };
    }
});

router.get('/collection', async (context) => {

    const {
        id,
    } = context.query;
    console.log(id);

    const oneUser = await User.findOne({
        _id: id,
    }).exec();

    var collectionList = [];
    console.log(oneUser);
    for(let i = 0; i < oneUser.collect.length; i++){
        const oneArticle = await Article.findOne({
            _id: oneUser.collect[i],
        }).exec();
        collectionList.push(oneArticle);
    }
    context.body = {
        code: 1,
        msg: '查找收藏夹成功',
        data: collectionList
    };
});

router.post('/adduser', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        phone,
        nickname,
        power,
    } = context.request.body;
    console.log(context)

    const password = '123456';
    // 使用findOne方法查询User表中是否存在与前端传来的用户名相同的用户名
    const one = await User.findOne({
        nickname: nickname,
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
        phone: phone,
    }).exec();

    // 如果存在则返回以下信息
    if (two) {
        context.body = {
            code: 0,
            msg: '该号码已被绑定',
            data: null,
        };
        return;
    }
    const member = await Character.findOne({
        title: '普通用户',
    });

    // 将两个变量的值传给user的model以创建数据库信息
    const regiuser = new User({
        phone: phone,
        nickname: nickname,
        password: password,
        character: member._id,
        characterTitle: member.title,
        power: power,
    });

    // const res = 
    await regiuser.save();
    // console.log(res);
    
    // 生成token返回给前端
    // const data = {
    //     nickname: res.nickname,
    //     phone: res.phone,
    //     _id: res._id,
    //     userAvatar: res.userAvatar,
    //     character: res.character,
    //     power: res.power,
    // };

    context.body = {
        code: 1,
        msg: '添加成功',
        data: null
    };
    // return;
    

    // context.body = {
    //     code: 1,
    //     msg: '注册成功',
    //     data: res,
    // };
});

module.exports = router;