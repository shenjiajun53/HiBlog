/**
 * Created by shenjiajun on 2017/1/29.
 */
module.exports = {
    port: 8006,
    session: {
        secret: 'hiblog',
        key: 'hiblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/hiblog'
};