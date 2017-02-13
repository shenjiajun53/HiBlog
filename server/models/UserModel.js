/**
 * Created by shenjj on 2017/2/9.
 */
let MongoUtil = require("../lib/MongoUtil");

class UserModel {
    constructor(userName, pass, userIntro) {
        this.userName = userName;
        this.pass = pass;
        this.userIntro = userIntro;
    }

    setUser(userName, pass, userIntro) {
        this.userName = userName;
        this.pass = pass;
        this.userIntro = userIntro;
    }

    createUser() {
        let userSechma = {
            userName: String,
            pass: String,
            userIntro: String
        };
        let userValue = {
            userName: this.userName,
            pass: this.pass,
            userIntro: this.userIntro
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel("user", userSechma, userValue);
    }

    findUserByName(userName) {

    }

    findUserById(_id) {

    }
}

module.exports = UserModel;