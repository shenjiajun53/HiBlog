/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let app = express();
let path = require('path');
let ejs = require('ejs');
let bodyParser = require("body-parser");
let MongoUtil = require("./server/lib/MongoUtil");

let homeRouter = require('./routes/homepage');
let userRouter = require('./routes/userInfo');
// let signRouter = require("./server/signUp").signUp;

// 设置模板目录
app.set('views', './views');

// 设置模板引擎为 ejs
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// app.post('/SignUp', signRouter);

app.use('/', homeRouter);
app.use('/users', userRouter);


// app.use配置
app.use('/output', express.static(path.join(__dirname, '/output')));
app.use('/views', express.static(path.join(__dirname, '/views')));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});

let mongoUtil = new MongoUtil();
mongoUtil.connect();

app.listen(process.env.PORT || 5006);

console.log("url=" + process.env.PORT);