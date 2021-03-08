const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number,
});

const UserModel = mongoose.model('User', UserSchema);

const connect = () => {

    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/testdata');

    mongoose.connection.on('open', () => {
        console.log('helloworld');

        // 创建文档
        const user = new UserModel({
            nickname: 'xiaoming',
            password: '123456',
            age: 18,
        });

        // 保存并同步到monogDB
        user.save();
    });
};

connect();