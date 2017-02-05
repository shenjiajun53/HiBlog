/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let app = express();
let path = require('path');
let ejs = require('ejs');
let bodyParser = require("body-parser");

let homeRouter = require('./routes/homepage');
let userRouter = require('./routes/userInfo');

// 设置模板目录
app.set('views', './views');
// 设置模板引擎为 ejs
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


app.use('/', homeRouter);
app.use('/users', userRouter);


let json = {
    a: 1,
    b: "gfdgfg",
    c: {
        fddf: 112,
        fdfd: "dfdfdf"
    }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/SignUp",
    (req, res) => {
        console.log("on Receive " + req.body.userName);
        // console.log("on Receive " + JSON.parse(req.body));
        res.send(req.body);
    }
);

// app.use配置
app.use('/output', express.static(path.join(__dirname, '/output')));
app.use('/views', express.static(path.join(__dirname, '/views')));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'views', 'index.html'))
});

app.listen(process.env.PORT || 5006);

console.log("url=" + process.env.PORT);