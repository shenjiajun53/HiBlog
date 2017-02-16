/**
 * Created by shenjj on 2017/2/9.
 */
let MongoUtil = require("../lib/MongoUtil");

let userSechma = {
    userName: String,
    pass: String,
    userIntro: String,
    fileName: String
};
let modelName = "user";
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
        let userValue = {
            userName: this.userName,
            pass: this.pass,
            userIntro: this.userIntro,
            fileName: this.fileName
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, userSechma, userValue);
    }

    findUserByName(userName) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, userSechma, {userName, userName});
    }

    findUserById(_id) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, userSechma, {_id, _id});
    }
}

module.exports = UserModel;