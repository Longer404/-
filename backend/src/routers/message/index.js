const Router = require('@koa/router');
const mongoose = require('mongoose');

const Message = mongoose.model('Message');
// const User = mongoose.model('User');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

const router = new Router({
    prefix: '/message'
});

router.post('/post', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        essay
    } = context.request.body;
    // console.log(storage.fileFormat.filename)
    console.log(essay);

    const message = new Message({
        messageFrom: essay.messageFrom,
        messageTo: essay.messageTo,
        messageAbout: essay.messageAbout,
        createAt: (new Date()).getTime(),
        content: essay.content,
        title: essay.title,
        messageType: essay.messageType
    })
    const res = await message.save();

    console.log('message');

    context.body = {
        code: 1,
        msg: '发送成功',
        // data: context.request.body,
        data: res
    };
});

router.post('/report', async (context) => {
    // context.body = '注册成功';
    // 新建两个变量获取前端返回的数据；
    const {
        report
    } = context.request.body;
    // console.log(storage.fileFormat.filename)
    console.log(report);

    const message = new Message({
        messageFromId: report.messageFrom,
        messageTo: report.messageTo,
        messageToId: report.messageToId,
        messageAbout: report.messageAbout,
        createAt: (new Date()).getTime(),
        content: report.content,
        title: report.title,
        reporter: report.reporter,
        reporterId: report.reporterId,
        messageType: 'report'
    })
    const data = await message.save();

    console.log('post report');

    context.body = {
        code: 1,
        msg: '举报反馈成功',
        // data: context.request.body,
        data: data
    };
});

router.get('/report', async (context) => {
    
    const {
        page = 1,
    } = context.query;
    // console.log(typeof examined);
    let {
        size = 10,
    } = context.query;
    size = Number(size);

    const list = await Message
        .find({
            title: '举报评论'
        })
        .sort({
            createAt: -1
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const totalReport = await Message.find({
        title: '举报评论'
    }).exec();

    const total = totalReport.length;
    console.log('get report');

    context.body = {
        code: 1,
        msg: '获取成功',
        // data: context.request.body,
        data: {
            list,
            total
        }
    };
});

router.get('/detail/:id', async (context) => {
    
    // 前端get访问http://127.0.0.1:3000/?a=1,则context.query的内容就是？后面的内容
    const {
        id,
    } = context.params;

    console.log("testing");

    const messageList = await Message.find({
        messageTo: id,
        messageFrom: {"$ne": id},
    }).sort({
        createAt: -1
    }).exec();

    context.body = {
        code: 1,
        msg: '获取成功',
        data: messageList,
    };
});

router.post('/getcode', async (context) => {

    var { phoneNum } = context.request.body;
    phoneNum = '+86' + phoneNum;
    console.log(phoneNum);

    var randomNum = "";
    for (var i = 0; i < 4; i++) {
        randomNum += Math.floor(Math.random() * 10);
    }
    console.log(randomNum);

    const tencentcloud = require("tencentcloud-sdk-nodejs");

    const SmsClient = tencentcloud.sms.v20190711.Client;

    const clientConfig = {
    credential: {
        secretId: "AKIDhHe0LJZ7OTkqjQwz0mQajhSxGyTnQD0Y",
        secretKey: "TtJVSnsiIcgT0IYZMuCSnLfroVw4CNLC",
    },
    region: "",
    profile: {
            httpProfile: {
                endpoint: "sms.tencentcloudapi.com",
            },
        },
    };

    const client = new SmsClient(clientConfig);
    const params = {
        "PhoneNumberSet": [
            phoneNum
        ],
        "TemplateID": "922190",
        "Sign": "shumyanlong",
        "TemplateParamSet": [
            randomNum
        ],
        "SmsSdkAppid": "1400506356"
    };
    client.SendSms(params).then(
        (data) => {
            console.log(data);
            console.log("-------------------------");
            
        },
        (err) => {
            console.error("error", err);
            console.log("+++++++++++++++++++++++++");
            return;
        }
    );
    context.body = {
        code: 1,
        msg: '发送成功',
        data: randomNum,
    };
});

router.get('/systemdata', async (context) => {
    console.log('total1');
    const totalUser = await User.countDocuments();
    
    console.log(totalUser);
    const totalArticle = await Article.countDocuments();
    const totalComment = await Comment.countDocuments();
    const SemifinishedArticle = await Article.find({
        examined: 'examining'
    }).exec();
    const totalSemifinishedArticle = SemifinishedArticle.length;
    context.body = {
        code: 1,
        msg: '统计完毕',
        data: {
            totalUser,
            totalArticle,
            totalComment,
            totalSemifinishedArticle
        }
        // data:'total'
    };
});

router.get('/totalpartition', async (context) => {
    console.log('total2');
    // const totalUser = await User.countDocuments();
    
    // console.log(totalUser);
    // const totalArticle = await Article.countDocuments();
    // const totalComment = await Comment.countDocuments();
    const anime = await Article.find({
        partition: 'animation'
    }).exec();
    const comics = await Article.find({
        partition: 'comics'
    }).exec();
    const game = await Article.find({
        partition: 'game'
    }).exec();
    const peripheral = await Article.find({
        partition: 'peripheral'
    }).exec();
    const doujin = await Article.find({
        partition: 'doujin'
    }).exec();
    const exhibition = await Article.find({
        partition: 'exhibition'
    }).exec();
    const totalAnime = anime.length;
    const totalComics = comics.length;
    const totalGame = game.length;
    const totalPeripheral = peripheral.length;
    const totalDoujin = doujin.length;
    const totalExhibition = exhibition.length;
    context.body = {
        code: 1,
        msg: '统计完毕',
        data: {
            totalAnime,
            totalComics,
            totalGame,
            totalPeripheral,
            totalDoujin,
            totalExhibition
        }
        // data:'total'
    };
});

router.delete('/:id', async (context) => {
    const {
        id,
    } = context.params;

    const tempMsg = await Message.findOne({
        _id: id,
    });

    const oneUser = await User.findOne({
        _id: tempMsg.messageTo,
    }).exec();

    oneUser.read = oneUser.read-1;
    await oneUser.save();

    const delMsg = await Message.deleteOne({
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