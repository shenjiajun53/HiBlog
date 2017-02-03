/**
 * Created by shenjj on 2017/1/23.
 */
var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');

var homeRouter = require('./routes/homepage');
var userRouter = require('./routes/userInfo');

// 设置模板目录
app.set('views', './src');
// 设置模板引擎为 ejs
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/', homeRouter);
app.use('/users', userRouter);

app.get("/#/SignUp1", function (req, res) {
    res.send("get 111111113333111");
});

// app.use配置
app.use('/output', express.static(path.join(__dirname, '/output')));
app.use('/src', express.static(path.join(__dirname, '/src')));

app.listen(process.env.PORT || 5006);