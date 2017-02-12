/**
 * Created by Administrator on 2017/2/11.
 */
let express = require('express');
// let checkNotLogin = require('../server/middlewares/check').checkNotLogin;

let router = express.Router();
class BaseRouter {
    constructor() {
        this.setUpRouter();
    }

    setUpRouter() {

    }

    getRouter() {
        return router;
    }
}
module.exports = BaseRouter;