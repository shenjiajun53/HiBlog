/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';

class BlogDetail extends React.Component {

    componentDidMount() {
        let url = "/api/getBlog";
        let blog = {
            blogId: this.props.params.blogId,
        };
        fetch(url, {
            method: "post",
            // body: data,
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                console.log(JSON.stringify(json));
                if (json.redirect) {
                    if (json.blogId) {
                        window.location = json.redirect + "/" + json.blogId;
                    }
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
                <h1>BlogDetail {this.props.params.blogId}</h1>
            </div>
        );
    }
}
export default BlogDetail;