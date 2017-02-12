/**
 * Created by shenjiajun on 2017/1/29.
 */
class LoginCheck {
    constructor() {

    }

    checkLogin(req, res) {
        if (req.session.user) {
            return true;
        } else {
            return false;
        }
    }

    hasLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录');
            return res.redirect('/SignIn');
        } else {
            console.log("已登录");
        }
        next();
    }

    hasNotLogin(req, res, next) {
        // console.log("user save success 4444 " + req.session.user);
        if (req.session.user) {
            console.log("已登录");
            req.flash('error', '已登录');
            // return res.send({redirect: "/"});//返回之前的页面
            return res.redirect("back");//返回之前的页面
        } else {
            console.log("未登录");
        }
        next();
    }
}
module.exports = LoginCheck;