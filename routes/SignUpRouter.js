/**
 * Created by Administrator on 2017/2/11.
 */
let express = require('express');
let UserModel = require("../server/models/UserModel");
let BaseRouter = require("./BaseRouter");
let LoginCheck = require('../server/middlewares/LoginCheck');

let router = express.Router();
class SignUpRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        router.post("/", new LoginCheck().hasNotLogin,
            (req, res) => {
                // console.log("user save success 3333 " + req.session.user.userName);
                console.log("on Receive " + req.body.userName);
                // console.log("on Receive " + JSON.parse(req.body));
                let user = req.body;
                let userModel = new UserModel(user.userName, user.pass, user.userIntro);
                userModel.createUser().then(
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
        // super.getRouter();
    }
}

module.exports = SignUpRouter;