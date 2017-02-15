/**
 * Created by shenjj on 2017/2/9.
 */
let MongoUtil = require("../lib/MongoUtil");

class UserModel {
    constructor(userName, pass, userIntro, fileName) {
        this.userName = userName;
        this.pass = pass;
        this.userIntro = userIntro;
        this.fileName = fileName;
    }

    setUser(userName, pass, userIntro, fileName) {
        this.userName = userName;
        this.pass = pass;
        this.userIntro = userIntro;
        this.fileName = fileName;
    }

    createUser() {
        let userSechma = {
            userName: String,
            pass: String,
            userIntro: String,
            fileName: String
        };
        let userValue = {
            userName: this.userName,
            pass: this.pass,
            userIntro: this.userIntro,
            fileName: this.fileName
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