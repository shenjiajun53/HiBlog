/**
 * Created by shenjj on 2017/1/23.
 */
let express = require('express');
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");
let router = express.Router();

class HomePageRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        router.get('/', function (req, res) {
            console.log("homepage on render");
            res.render('index', {
                value1: 123,
                value2: 456
            });
            // res.render('');
            // res.redirect("/SignUp");
        });
    }

    getRouter() {
        return router;
    }

}


module.exports = HomePageRouter;