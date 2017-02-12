/**
 * Created by Administrator on 2017/2/12.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();
let DealBlog = require("../server/DealBlog");

class BlogRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        router.post("/sendBlog", new LoginCheck().hasLogin, (req, res) => {
            console.log("on Receive " + req.body.blogTitle);
            // console.log("on Receive " + JSON.parse(req.body));
            let rawBlog = req.body;
            let blog = {
                author: req.session.user._id,
                blogTitle: rawBlog.blogTitle,
                blogContent: rawBlog.blogContent
            };
            let dealBlog = new DealBlog(blog);
            dealBlog.restoreBlog().then(
                (model) => {
                    // 写入 flash
                    req.flash('success', '注册成功');

                    // 跳转到首页
                    return res.send({
                        redirect: "/BlogDetail",
                        blogId: model._id
                    });
                }
            ).catch((e) => {
                console.error(e);
            });
        });

        // router.post("/getBlog", new LoginCheck().hasLogin, (req, res) => {
        //     console.log("on Receive " + req.body.blogTitle);
        //     // console.log("on Receive " + JSON.parse(req.body));
        //     let rawBlog = req.body;
        //     let blog = {
        //         author: req.session.user._id,
        //         blogTitle: rawBlog.blogTitle,
        //         blogContent: rawBlog.blogContent
        //     };
        //     let dealBlog = new DealBlog(blog);
        //     dealBlog.restoreBlog().then(
        //         (model) => {
        //             // 写入 flash
        //             req.flash('success', '注册成功');
        //
        //             // 跳转到首页
        //             return res.send({
        //                 redirect: "/BlogDetail",
        //                 blogId: model._id
        //             });
        //         }
        //     ).catch((e) => {
        //         console.error(e);
        //     });
        // });
    }

    getRouter() {
        return router;
    }

}


module.exports = BlogRouter;