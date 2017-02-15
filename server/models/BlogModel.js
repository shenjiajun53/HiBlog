/**
 * Created by Administrator on 2017/2/12.
 */
let MongoUtil = require("../lib/MongoUtil");

let blogSechma = {
    author: String,
    blogTitle: String,
    blogContent: String,
    time: Number
};
let modelName = "blog";
class BlogModel {
    constructor(blog) {
        this.blog = blog;
    }

    setBlog(blog) {
        this.blog = blog;
    }

    createBlog() {
        let blogValue = {
            author: this.blog.author,
            blogTitle: this.blog.blogTitle,
            blogContent: this.blog.blogContent,
            time: Date.now()
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, blogSechma, blogValue);
    }

    findBlogs() {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelSort(modelName, blogSechma, {_id: -1});
    }

    findBlogByUser(userId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, blogSechma, {"_id": userId});
    }

    findBlogById(blogId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, blogSechma, {"_id": blogId});
    }
}

module.exports = BlogModel;