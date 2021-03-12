const Koa = require('koa');
const koaBody = require('koa-body');
// const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');


const app = new Koa();

connect().then(() => {
    // 服务端运行跨域
    app.use(cors());

    app.use(koaBody());

    // 注册路由 
    registerRoutes(app);
    // 开启一个http服务
    // 接收http请求并作出处理，处理完后响应
    app.listen(3000, () => {
        console.log('启动成功');
    });
});

