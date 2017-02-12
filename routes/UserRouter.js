/**
 * Created by Administrator on 2017/2/12.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();
let DealSignUp = require("../server/DealSignUp");

class UserRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        router.post("/checkLogin", (req, res) => {
            let hasLogin = new LoginCheck().checkLogin(req, res);
            console.log("hasLogin=" + hasLogin);
            res.json({
                hasLogin: hasLogin
            });
        });

        router.post("/SignOut", (req, res) => {
            req.session.user = null;
            req.flash('success', '登出成功');
            // 登出成功后跳转到主页
            return res.json({redirect: "/"});
        });

        router.post("/SignUp", new LoginCheck().hasNotLogin,
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
                        // 写入 flash
                        req.flash('success', '注册成功');

                        // 跳转到首页
                        return res.send({redirect: "/"});
                        // res.redirect("/");
                        // return res.send(user);
                    }
                ).catch((e) => {
                    console.error(e);
                });
            }
        );
    }

    getRouter() {
        return router;
    }

}


module.exports = UserRouter;