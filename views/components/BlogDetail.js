/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';
import UrlUtil from "../utils/UrlUtil";
import Card from "material-ui/Card"
import Avatar from "material-ui/Avatar";
import moment from "moment";
import colors from "../utils/colors"

class BlogDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: null
        }
    }

    componentDidMount() {
        let url = "/api/getBlog";
        let blog = {
            blogId: this.props.params.blogId,
        };
        url = new UrlUtil().json2Url(url, blog);
        console.log("url=" + url);

        fetch(url, {
            method: "get",
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                console.log(JSON.stringify(json));
                if (json.result) {
                    this.setState({
                        blog: json.result.blog,
                    })
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        let blog = this.state.blog;
        // console.log(JSON.stringify(blog));
        let avatarPath;
        let showAvatarImg = "none";
        let showAvatarName = "flex";
        let dateStr;
        if (blog) {
            if (blog.user) {
                if (blog.user.fileName) {
                    avatarPath = "/uploadFiles/avatars/" + blog.user.fileName;
                    showAvatarImg = "flex";
                    showAvatarName = "none";
                    // console.log("avatarPath=" + avatarPath);
                }
            }
            let time = blog.time;
            let date = new Date(time);
            dateStr = moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        if (blog) {
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div style={{
                        width: "600px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <h1 style={{}}>{blog.blogTitle}</h1>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <Avatar src={avatarPath} style={{display: showAvatarImg}}
                                    backgroundColor={colors.accent}/>
                            <Avatar style={{display: showAvatarName}}
                                    backgroundColor={colors.accent}>
                                {blog.user.userName[0]}
                            </Avatar>
                            <div>
                                <div style={{marginLeft: "10px"}}>{blog.user.userName}</div>
                                <div style={{marginLeft: "10px"}}>{dateStr}</div>
                            </div>
                        </div>
                        <div style={{marginTop: "20px", maxLength: 2}}>{blog.blogContent}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}
export default BlogDetail;