/**
 * Created by Administrator on 2017/2/12.
 */
let MongoUtil = require("../lib/MongoUtil");

class BlogModel {
    constructor(blog) {
        this.blog = blog;
    }

    setBlog(blog) {
        this.blog = blog;
    }

    createBlog() {
        let blogSechma = {
            author: String,
            blogTitle: String,
            blogContent: String,
        };
        let blogValue = {
            author: this.blog.author,
            blogTitle: this.blog.blogTitle,
            blogContent: this.blog.blogContent,
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel("blog", blogSechma, blogValue);
    }

    findBlogs() {
        let blogSechma = {
            author: String,
            blogTitle: String,
            blogContent: String,
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModel("blog", blogSechma);
    }

    findBlogByUser(userId) {
        let blogSechma = {
            author: String,
            blogTitle: String,
            blogContent: String,
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelById("blog", blogSechma, userId);
    }

    findBlogById(blogId) {
        let blogSechma = {
            author: String,
            blogTitle: String,
            blogContent: String,
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelById("blog", blogSechma, blogId);
    }
}

module.exports = BlogModel;