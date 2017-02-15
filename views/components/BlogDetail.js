/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';
import UrlUtil from "../utils/UrlUtil";

class BlogDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogTitle: "",
            blogContent: ""
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
                        blogTitle: json.result.blogTitle,
                        blogContent: json.result.blogContent
                    })
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.blogTitle}</h1>
                <div>{this.state.blogContent}</div>
            </div>
        );
    }
}
export default BlogDetail;