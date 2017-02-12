/**
 * Created by Administrator on 2017/2/11.
 */
let express = require('express');
let DealSignUp = require("../server/DealSignUp");
let LoginCheck = require('../server/middlewares/LoginCheck');
let BaseRouter = require("./BaseRouter");

let router = express.Router();
class SignInRouter extends BaseRouter {
    // constructor() {
    //     super();
    //     // this.setUpRouter();
    // }

    setUpRouter() {
        // router.get("/", (req, res) => {
        //     return res.redirect("/UserCenter");
        // })
    }

    getRouter() {
        return router;
        // super.getRouter();
    }
}

module.exports = SignInRouter;