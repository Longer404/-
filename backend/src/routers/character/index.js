const Router = require('@koa/router');
const mongoose = require('mongoose');
const { verify, getToken } =require('../../helpers/token')

const Character = mongoose.model('Character');

const router = new Router({
    prefix: '/character',
});


router.get('/info', async (context) => {
    context.body = {
        data: await verify(getToken(context)),
        code: 1,
        msg: '获取成功',
    }
    
});

module.exports = router;

// const newAdmin = new Character({
//         name: 'member',
//         title: '普通用户'
//     });
// newAdmin.save();