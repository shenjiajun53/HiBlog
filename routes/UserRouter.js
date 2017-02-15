/**
 * Created by Administrator on 2017/2/12.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();
let UserModel = require("../server/models/UserModel");
let multer = require('multer');
let storage = multer.diskStorage({
    destination: './uploadFiles/avatars',
    filename: function (req, file, cb) {
        console.log("fileName=" + file.originalname);
        fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    }
});
// let upload = multer({dest: 'uploads/'});
let upload = multer({storage: storage});


let fileName;
class UserRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        router.post("/SignUp", new LoginCheck().hasNotLogin,
            upload.single('avatar'),
            (req, res) => {
                // console.log("user save success 3333 " + req.session.user.userName);
                console.log("on Receive " + req.body.userName);
                // console.log("on Receive " + JSON.parse(req.body));
                let user = req.body;
                let userModel = new UserModel(user.userName, user.pass, user.userIntro, fileName);
                userModel.createUser().then(
                    (model) => {
                        delete user.pass;
                        req.session.user = model;
                        // 写入 flash
                        console.log("保存成功 model id=" + req.session.user._id + " name=" + req.session.user.userName);
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


    }

    getRouter() {
        return router;
    }

}


module.exports = UserRouter;