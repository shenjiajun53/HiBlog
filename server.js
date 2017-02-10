/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let app = express();
let path = require('path');
let ejs = require('ejs');
let bodyParser = require("body-parser");
let MongoUtil = require("./server/lib/MongoUtil");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config-lite');
var flash = require('connect-flash');
let homeRouter = require('./routes/homepage');
let userRouter = require('./routes/userInfo');
// let signRouter = require("./server/signUp").signUp;

// 设置模板目录
app.set('views', './views');

// 设置模板引擎为 ejs
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// app.use配置
app.use('/output', express.static(path.join(__dirname, '/output')));
app.use('/views', express.static(path.join(__dirname, '/views')));



app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));


// flash 中间价，用来显示通知
app.use(flash());

// 添加模板必需的三个变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    console.log("11111 user=" + req.session.user);
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// app.post('/SignUp', signRouter);

app.use('/', homeRouter);
app.use('/users', userRouter);

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});

let mongoUtil = new MongoUtil();
mongoUtil.connect();

app.listen(process.env.PORT || 5006);

console.log("url=" + process.env.PORT);