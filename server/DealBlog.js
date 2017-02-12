/**
 * Created by Administrator on 2017/2/12.
 */
let BlogModel = require("./models/BlogModel");

class DealBlog {
    constructor(blog) {
        this.blog = blog;
    }



    restoreBlog() {
        // console.log("userName=" + this.userName + " pass=" + this.pass);
        // let mongoUtil = new MongoUtil();
        // mongoUtil.connect();
        let blogModel = new BlogModel(this.blog);
        return blogModel.createBlog();
    }
}

module.exports = DealBlog;