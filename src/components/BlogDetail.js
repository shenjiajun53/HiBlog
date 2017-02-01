/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';

class BlogDetail extends React.Component {
    render() {
        return (
            <div>
                <h1>BlogDetail {this.props.params.blogId}</h1>
            </div>
        );
    }
}
export default BlogDetail;