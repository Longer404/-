const getMeta = () => {
    // console.log((new Date()).getTime());
    // 注意此时的时间戳是schemas被注册的时间
    // 因此当程序运行的时候createdAt就已经被固定下来
    // 因为schemas每次运行程序只会执行一次
    // 所以在数据库中的记录会出现大量时间戳相同的记录
    return {
        createdAt: {
            type: Number,
            default: (new Date()).getTime(),
        },
        updatedAt: {
            type: Number,
            default: (new Date()).getTime(),
        }
    };
};

module.exports = {
    getMeta,
};