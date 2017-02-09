/**
 * Created by shenjj on 2017/2/9.
 */
let MongoUtil = require("./lib/MongoUtil");
let UserModel = require("./models/UserModel");

class DealSignUp {
    constructor(userName, pass, userIntro) {
        this.userName = userName;
        this.pass = pass;
        this.userIntro = userIntro;
    }

    restoreUser() {
        console.log("userName=" + this.userName + " pass=" + this.pass);
        // let mongoUtil = new MongoUtil();
        // mongoUtil.connect();
        let userModel = new UserModel(this.userName, this.pass, this.userIntro);
        return userModel.createUser();
    }
}

module.exports = DealSignUp;
