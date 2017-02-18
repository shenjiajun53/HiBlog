/**
 * Created by Administrator on 2017/2/12.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();
let BlogModel = require("../server/models/BlogModel");
let UserModel = require("../server/models/UserModel");
let ResponseUtil = require("../server/lib/ResponseUtil");

class BlogRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        router.post("/sendBlog", (req, res) => {
            console.log("on Receive " + req.body.blogTitle);
            // console.log("on Receive " + JSON.parse(req.body));
            let rawBlog = req.body;
            let blog = {
                userId: req.session.user._id,
                blogTitle: rawBlog.blogTitle,
                blogContent: rawBlog.blogContent
            };
            let blogModel = new BlogModel(blog);
            blogModel.createBlog().then(
                (model) => {
                    // 写入 flash
                    req.flash('success', '注册成功');

                    // 跳转到首页
                    return res.send(new ResponseUtil({
                        redirect: "/BlogDetail",
                        blogId: model._id
                    }, null));
                }
            ).catch((e) => {
                console.error(e);
            });
        });

        router.get("/getBlog", (req, res) => {
            console.log("on Receive blogId=" + req.query.blogId);
            let blogModel = new BlogModel();
            blogModel.findBlogById(req.query.blogId).then((blogResults) => {
                console.log("blogResults size=" + blogResults.length);
                let userModel = new UserModel();
                userModel.findUserById(blogResults[0].userId)
                    .then((userResults) => {
                        if (null !== userResults && userResults.length > 0) {
                            userResults[0].pass = "";
                            let user = JSON.parse(JSON.stringify(userResults[0])); //clone
                            let blog = JSON.parse(JSON.stringify(blogResults[0]));
                            blog.user = user;
                            return res.send(new ResponseUtil({
                                blog: blog
                            }, null));
                        }
                    })

            }).catch((e) => {
                console.error(e);
            });
        });

        router.post("/getBlogsByUser", (req, res) => {
            let user = req.body.user;
            console.log("user=" + JSON.stringify(user));
            let blogList = new Array();
            let blogModel = new BlogModel();
            let index = 0;
            blogModel.findBlogByUser(user._id).then((blogResults) => {
                console.log("blogResults size=" + blogResults.length);
                for (let i = 0; i < blogResults.length; i++) {
                    let blog = JSON.parse(JSON.stringify(blogResults[i]));
                    blog.user = user;
                    blogList.push(blog);
                    if (i >= blogResults.length - 1) {
                        return res.send(new ResponseUtil({
                            blogList: blogList
                        }, null));
                    }
                }
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