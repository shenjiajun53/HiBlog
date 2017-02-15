/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();
let BlogModel = require("../server/models/BlogModel");
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
            let blogModel = new BlogModel();
            blogModel.findBlogs().then((models) => {
                console.log(models);
                return res.send(new ResponseUtil({
                    blogList: models
                }, null));
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