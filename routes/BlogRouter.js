/**
 * Created by Administrator on 2017/2/12.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();
let BlogModel = require("../server/models/BlogModel");

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
            let blogModel = new BlogModel(blog);
            blogModel.createBlog().then(
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

        router.get("/getBlog", (req, res) => {
            console.log("on Receive blogId=" + req.query.blogId);
            let blogModel = new BlogModel();
            blogModel.findBlogById(req.query.blogId).then((models) => {
                console.log(models);
                let model = models[0];
                return res.send({
                    blogTitle: model.blogTitle,
                    blogContent: model.blogContent
                });
            }).catch((e) => {
                console.error(e);
            });
        });
    }

    getRouter() {
        return router;
    }

}


module.exports = BlogRouter;