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
        router.get("/api", (req, res, next) => {
            res.send({value1: 123, value2: 456});
            next();
        })
    }

    getRouter() {
        return router;
        // super.getRouter();
    }
}

module.exports = SignInRouter;