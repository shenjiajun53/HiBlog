/**
 * Created by shenjiajun on 2017/1/29.
 */
module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录');
            return res.redirect('/SignIn');
        } else {
            console.log("已登录");
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        // console.log("user save success 4444 " + req.session.user);
        if (req.session.user) {
            console.log("已登录");
            req.flash('error', '已登录');
            return res.redirect('back');//返回之前的页面
        } else {
            console.log("未登录");
        }
        next();
    }
};