/**
 * Created by Administrator on 2017/2/11.
 */
let HomePageRouter = require("./HomePageRouter");
let UserRouter = require("./UserRouter");
let BlogRouter = require("./BlogRouter");
let LoginCheck = require('../server/middlewares/LoginCheck');

class RouterManager {
    constructor(app) {
        this.app = app;
        // this.startRouters();
    }

    setApp(app) {
        this.app = app;
    }

    startRouters() {
        this.app.use("/", new HomePageRouter().getRouter());
        this.app.use("/api", new UserRouter().getRouter());
        this.app.use("/api", new BlogRouter().getRouter());
    }
}

module.exports = RouterManager;