/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let DealSignUp = require("../server/DealSignUp");
var checkNotLogin = require('../server/middlewares/check').checkNotLogin;

let router = express.Router();

router.post("/SignUp", checkNotLogin,
    (req, res) => {
        // console.log("user save success 3333 " + req.session.user.userName);
        console.log("on Receive " + req.body.userName);
        // console.log("on Receive " + JSON.parse(req.body));
        let user = req.body;
        let dealSignUp = new DealSignUp(user.userName, user.pass, user.userIntro);
        dealSignUp.restoreUser().then(
            () => {
                delete user.pass;
                req.session.user = user;
                console.log("user save success 3333 " + req.session.user.userName);
                // 写入 flash
                req.flash('success', '注册成功');

                // 跳转到首页
                res.send({redirect: "/"});
                // res.redirect('http://localhost:5006/users/shenjiajun');
                // return res.send(user);
            }
        ).catch((e) => {
            console.error(e);
        });
    }
);

router.get('/', function (req, res) {
    console.log("homepage on render");
    res.render('index');
    // res.render('');
    // res.redirect("/SignUp");
});


module.exports = router;