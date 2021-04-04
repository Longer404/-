const Router = require('@koa/router');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

const Article = mongoose.model('Article');

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

    const article = new Article({
        author: essay.author,
        authorId: essay.authorId,
        title: essay.title,
        createAt: essay.createAt,
        coverUrl: essay.coverUrl,
        about: essay.about,
        content: essay.content,
        partition: essay.partition,
        "meta.createdAt": (new Date()).getTime(),
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
        
    } = context.query;

    let {
        size = 10,
    } =context.query;

    size = Number(size);
    
    console.log('get all article list')

    // 将数据库中article表的记录的总数传给total
    const total = await Article.countDocuments();
    // const list = await Article.find().exec();

    // 通过当前页码page和每页显示的数量，从数据库中取出响应的记录
    if (type === 'id') {
        console.log('byID');
        var list = await Article
            .find()
            .sort({
                _id: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }
    if (type === 'title') {
        console.log('byTitle');
        var list = await Article
            .find()
            .sort({
                title: -1,
            })
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }
    if (type === 'createAt') {
        console.log('byCAt');
        var list = await Article
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
    }).exec();

    if (!list) {
        context.body = {
            code: 0,
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

router.get('/examination/:id', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        id,
    } = context.params;

    const {
        examined = 'pass',
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

    console.log('examination article')
    
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

module.exports = router;