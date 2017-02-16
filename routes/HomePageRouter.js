/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();
let BlogModel = require("../server/models/BlogModel");
let UserModel = require("../server/models/UserModel");
let ResponseUtil = require("../server/lib/ResponseUtil");

class HomePageRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        router.get('/', function (req, res) {
            console.log("homepage on render");
            res.render('index');
            // res.render('');
            // res.redirect("/SignUp");
        });

        router.get("/api/getAllBlogs", (req, res) => {
            let blogList = new Array();
            let blogModel = new BlogModel();
            blogModel.findBlogs().then((blogModels) => {
                console.log("blogModels size=" + blogModels.length);
                for (let i = 0; i < blogModels.length; i++) {
                    console.log("find user" + i);
                    let userModel = new UserModel();
                    userModel.findUserById(blogModels[i].author)
                        .then((userModels) => {
                            console.log("i=" + i + " size=" + blogModels.length);
                            if (null !== userModels && userModels.length > 0) {
                                let user = userModels[0];
                                // console.log("user=" + user);
                                let blog = blogModels[i];
                                blog.user = user;
                                // console.log("blogModels=" + blogModels[i]);
                                blogList.push(blog);
                                console.log("blogModels=" + blogModels[i].user);
                                if (i >= blogModels.length - 1) {
                                    return res.send(new ResponseUtil({
                                        blogList: blogList
                                    }, null));
                                }
                            }
                        })
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


module.exports = HomePageRouter;