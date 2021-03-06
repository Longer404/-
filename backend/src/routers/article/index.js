const Router = require('@koa/router');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

const Article = mongoose.model('Article');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

const router = new Router({
    prefix: '/article'
});

router.post('/post', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        essay
    } = context.request.body;
    // console.log(storage.fileFormat.filename)
    console.log(essay)

    const one = await User.findOne({
        _id: essay.authorId
    }).exec();

    if(one.power === '4' || one.power === '3') {
        context.body = {
            code: 0,
            msg: '发布失败，你的账号已被禁止发布资讯',
            // data: context.request.body,
            data: null
        };
        return;
    }

    if(one.reputation < 60) {
        context.body = {
            code: 0,
            msg: '发布失败，你的信誉积分低于60已被禁止发布资讯',
            // data: context.request.body,
            data: null
        };
        return;
    }

    const article = new Article({
        author: essay.author,
        authorId: essay.authorId,
        authorAvatar: essay.authorAvatar,
        title: essay.title,
        createAt: essay.createAt,
        coverUrl: essay.coverUrl,
        about: essay.about,
        content: essay.content,
        partition: essay.partition,
        "meta.createdAt": (new Date()).getTime(),
    })
    const res = await article.save();

    console.log('postart');

    context.body = {
        code: 1,
        msg: '发布成功',
        // data: context.request.body,
        data: res
    };
});

// 接收前端传来的文章并更新数据库中的记录
router.post('/update', async (context) => {
    // 接收前端传来的文章
    const {
        essay,
    } = context.request.body;

    console.log(essay);
    // 根据传来的文章的id查找是否已经存在此文章
    const one = await Article.findOne({
        _id: essay.articleId
    }).exec();

    // 如果不存在则说明前端传上来的是新的文章，需要在数据库中新建
    if (!one) {
        // const newDraft = new Draft({
        //     author: essay.author,
        //     authorId: essay.authorId,
        //     title: essay.title,
        //     createAt: essay.createAt,
        //     coverUrl: essay.coverUrl,
        //     about: essay.about,
        //     content: essay.content,
        //     partition: essay.partition
        // });
        // const res = await newDraft.save();
        context.body = {
            code: 0,
            msg: '找不到文章',
            // data: context.request.body,
            data: null,
        };
        return;
    }

    // 如果存在文章，则用数据库中的数据与前端传来的数据进行对比
    // 然后更新数据库的记录
    if (essay.coverUrl !== '') {
        one.coverUrl = essay.coverUrl
    }

    if (essay.title !== one.title) {
        one.title = essay.title
    }

    if (essay.partition !== one.partition) {
        one.partition = essay.partition
    }

    if (essay.about !== one.about) {
        one.about = essay.about
    }

    if (essay.content !== one.content) {
        one.content = essay.content
    }
    one.examined = "examining";
    console.log('updateart');
    // 保存数据库记录
    await one.save();
    console.log('旧文章')
    context.body = {
        code: 1,
        msg: '保存成功',
        data: one,
    };
    return;
});

router.get('/list', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        page = 1,
        examined = 'pass',
        type = '',
    } = context.query;

    // console.log(typeof examined);

    let {
        size = 5,
        
    } =context.query;

    size = Number(size);
    // examined = Boolean(examined);
    // console.log(typeof examined);
    // console.log(examined);
    
    // const article = new Article({
    //     title: '第一篇文章',
    //     author: 'longer',
    //     createAt: Date(),
    //     about: '这是第一篇文章的摘要',
    //     content: '这是第一篇文章的内容',
    // })
    // const res = await article.save();

    // 将数据库中article表的记录的总数传给total
    // const total = await Article.countDocuments();

    // const list = await Article.find().exec();
    if (examined === 'examining') {
        console.log('find by examined')
        const list = await Article
        .find({
            examined: 'examining',
        })
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

        const total = list.length;

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
        
    } else if (examined === 'pass') {
        console.log('normal get article list')
        // 通过当前页码page和每页显示的数量，从数据库中取出响应的记录
        if (type === 'rank') {
            var list = await Article
            .find({
                examined: 'pass',
            })
            .sort({
                read: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        } else if (type === 'recommend') {
            var list = await Article
            .find({
                examined: 'pass',
            })
            .sort({
                likes: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        } else if (type === 'carousel') {
            var list = await Article
            .find({
                examined: 'pass',
            })
            .sort({
                _id: -1,
            })
            .skip(5)
            .limit(size)
            .exec();
        } else {
            var list = await Article
            .find({
                examined: 'pass',
            })
            .sort({
                _id: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        }
        
        const compliantList = await Article.find(
            {
                examined: 'pass',
            }).exec();
        const total = compliantList.length;

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
    }

    
});

router.get('/list/:partition', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        partition,
    } = context.params;
    
    const {
        page = 1,
        
    } = context.query;

    let {
        size = 5,
    } =context.query;

    size = Number(size);

    const list = await Article
        .find({
            partition: partition,
            examined: 'pass',
        })
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    console.log('list partition');
    // const total = await Article.countDocuments();
    const total = await Article.find({
        partition: partition,
        examined: 'pass',
    }).count();
    console.log(total);

    if (!list) {
        context.body = {
            code: 0,
            msg: '没有相关投稿',
            data: null,
        };
    }

    // 最后返回前端所需的数据
    context.body = {
        code: 1,
        msg: '获取成功',
        data: {
            list,
            total
        }
    };
});

router.get('/table/:type', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        type,
    } = context.params;

    const {
        page = 1,
        id
    } = context.query;

    let {
        size = 10,
    } =context.query;

    size = Number(size);
    
    console.log('get all article list')

    // 将数据库中article表的记录的总数传给total
    const total = await Article.find({
        examined: 'pass',
    });
    // const list = await Article.find().exec();
    
    // 通过当前页码page和每页显示的数量，从数据库中取出响应的记录
    if (type === 'examining') {
        console.log('examining');
        console.log(id);
        var list = await Article
            .find({
                authorId: id,
                examined: 'examining',
            })
            .sort({
                _id: -1,
            })
            .exec();
    }
    // if (type === 'title') {
    //     console.log('byTitle');
    //     var list = await Article
    //         .find({
    //             examined: 'pass',
    //         })
    //         .sort({
    //             title: -1,
    //         })
    //         .skip((page - 1) * size)
    //         .limit(size)
    //         .exec();
    // }
    if (type === 'createAt') {
        console.log('byCAt');
        var list = await Article
            .find({
                examined: 'pass',
            })
            .sort({
                "meta.createdAt": -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }
    
    // const total = list.length;
    // 最后返回前端所需的数据
    context.body = {
        code: 1,
        msg: '获取成功',
        data: {
            total: total.length,
            page,
            size,
            list,
        }
    };
});

router.get('/detail/:id', async (context) => {

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
    
    one.read++;
    await one.save();
    
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
        examined: 'pass',
    }).exec();
    const total = list.length;
    if (list.length === 0) {
        context.body = {
            code: 0,
            msg: '还没有任何投稿',
            data: {
                list,
                total
            }
        };
        return;
    }
    
    console.log('list')
    
    // 最后返回前端所需的数据
    context.body = {
        code: 1,
        msg: '获取成功',
        data: {
            list,
            total
        }
    };
});

router.get('/personal/:id', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        id,
    } = context.params;

    const list = await Article.find({
        authorId: id,
    }).exec();
    const total = list.length;
    if (total === 0) {
        context.body = {
            code: 0,
            msg: '还没有任何投稿',
            data: {
                list,
                total
            }
        };
        return;
    }
    
    console.log('list')
    
    // 最后返回前端所需的数据
    context.body = {
        code: 1,
        msg: '获取成功',
        data: {
            list,
            total
        }
    };
});

router.get('/examination/:id', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        id,
    } = context.params;

    const {
        examined = 'pass',
        title,
        authorId
    } = context.query;
    
    const one = await Article.findOne({
        _id: id,
    }).exec();

    if (!one) {
        context.body = {
            code: 0,
            msg: '找不到文章',
            data: null,
        };
    }

    console.log('examination article');
    if (examined === 'pass'){
        const author = await User.findOne({
            _id: authorId,
        }).exec();

        var i = 0;
        for(;i < author.beFollowed.length; i++ ){
            console.log(i);
            const message = new Message({
                messageFrom: authorId,
                messageTo: author.beFollowed[i],
                messageAbout: id,
                createAt: (new Date()).getTime(),
                content: title,
                title: author.nickname + ' 发布了新的资讯',
                messageType: 'message'
            });
            await message.save();
        }

    }
    
    one.examined = examined;
    await one.save();
    // 最后返回前端所需的数据
    context.body = {
        code: 1,
        msg: '操作成功',
        data: {
            // total,
            // page,
            // size,
            one,
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

router.get('/searchSemiArt', async (context) => {
    const {
        keyword
    } = context.query;
    console.log("semi");
    var articleList = await Article.find({
        examined: 'examining',
        title: {$regex: keyword}
    }).exec();

    // for(var i = 0; i < articleList.length; i++){
    //     if(articleList[i].examined === 'pass'){
    //         articleList.splice(i,1);
    //     }
    // }

    if(!articleList) {
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
        data: articleList
    }
});

router.get('/search', async (context) => {
    const {
        keyword
    } = context.query;
    console.log("pass");
    var articleList = await Article.find({
        examined : 'pass',
        title: {$regex: keyword}
    }).exec();

    if(!articleList.length) {
        context.body = {
            code: 0,
            msg: '没有搜索结果',
            data: []
        }
        return;
    }
    context.body = {
        code: 1,
        msg: '搜索成功',
        data: articleList
    }
});

router.post('/handlelike', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        userid,
        articleid
    } = context.request.body;

    const oneArticle = await Article.findOne({
        _id: articleid,
    }).exec();

    const flag = oneArticle.likes.indexOf(userid);

    // 不等于-1则表示存在，flag为索引（下标
    if(flag !== -1){
        oneArticle.likes.remove(userid);
        await oneArticle.save();
        context.body = {
            code: 1,
            msg: '取消点赞成功',
            data: null
        };
    } else if(flag === -1) {
        oneArticle.likes.push(userid);
        await oneArticle.save();
        context.body = {
            code: 1,
            msg: '点赞成功',
            data: null
        };
    }
});

module.exports = router;