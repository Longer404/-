const Router = require('@koa/router');
const mongoose = require('mongoose');

const Draft = mongoose.model('Draft');

const router = new Router({
    prefix: '/draft'
});

// 接收前端传来的新草稿并保存到数据库
router.post('/post', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        essay
    } = context.request.body;
    // console.log(storage.fileFormat.filename)
    console.log(essay);

    const draft = new Draft({
        author: essay.author,
        authorId: essay.authorId,
        title: essay.title,
        createAt: essay.createAt,
        coverUrl: essay.coverUrl,
        about: essay.about,
        content: essay.content,
        partition: essay.partition
    })
    const res = await draft.save();

    console.log('新草稿');

    context.body = {
        code: 1,
        msg: '保存成功',
        // data: context.request.body,
        data: res
    };
});

// 接收前端传来的草稿并更新数据库中的记录
router.post('/update', async (context) => {
    // 接收前端传来的草稿
    const {
        essay,
    } = context.request.body;

    console.log(essay);
    // 根据传来的草稿的id查找是否已经存在此草稿
    const one = await Draft.findOne({
        _id: essay.articleId
    }).exec();

    // 如果不存在则说明前端传上来的是新的草稿，需要在数据库中新建
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
            msg: '找不到草稿',
            // data: context.request.body,
            data: null,
        };
        return;
    }

    // 如果存在草稿，则用数据库中的数据与前端传来的数据进行对比
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
    // 保存数据库记录
    await one.save();
    console.log('旧草稿')
    context.body = {
        code: 1,
        msg: '保存成功',
        data: one,
    };
    return;
});

// 根据前端传来的草稿id，找出数据库中相应的记录并返回到前端
router.get('/:id', async (context) => {

    const {
        id,
    } = context.params;

    const one = await Draft.findOne({
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

// 根据前端传来的用户id，向前端返回该用户的草稿列表
router.get('/manager/:id', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        id,
    } = context.params;

    const list = await Draft.find({
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

// 根据前端传来的草稿id删除数据库中对应id的记录
router.delete('/:id', async (context) => {
    const {
        id,
    } = context.params;

    const delMsg = await Draft.deleteOne({
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