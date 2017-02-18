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
            let index = 0;
            blogModel.findBlogs().then((blogResults) => {
                console.log("blogResults size=" + blogResults.length);
                for (let i = 0; i < blogResults.length; i++) {
                    let userModel = new UserModel();
                    userModel.findUserById(blogResults[i].userId)
                        .then((userResults) => {
                            if (null !== userResults && userResults.length > 0) {
                                userResults[0].pass = "";
                                let user = JSON.parse(JSON.stringify(userResults[0])); //clone
                                let blog = JSON.parse(JSON.stringify(blogResults[i]));
                                blog.user = user;
                                blogList.push(blog);
                                index++;
                                console.log("blogResult=" + JSON.stringify(blog));
                                console.log("blogResult.user=" + JSON.stringify(blog.user));
                                if (index >= blogResults.length) {
                                    blogList = blogList.sort((a, b) => {
                                        if (a._id > b._id) {
                                            return -1;
                                        } else if (a._id < b._id) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    });
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