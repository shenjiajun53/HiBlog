/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TopBar from "./TopBar";
import moment from "moment";

// injectTapEventPlugin();
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: null,
        }
    }

    componentDidMount() {
        let url = "/api/getAllBlogs";
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
                this.setState({
                    blogList: json.result.blogList
                })
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        let blogListView;

        // if(null != this.state.blogList){
        //     for (let i = 0; i < this.state.blogList.length; i++) {
        //         blogListView.push(<div key={this.state.blogList[i]._id}>
        //             <h1>{this.state.blogList[i].blogTitle}</h1>
        //             <div>{this.state.blogList[i].blogContent}</div>
        //         </div>);
        //     }
        // }

        if (null != this.state.blogList) {
            blogListView = this.state.blogList.map(
                (blog) => {
                    console.log("blog=" + blog.blogTitle);
                    let time = blog.time;
                    let date = new Date(time);
                    let dateStr = moment(date).format("YYYY-MM-DD HH:mm:ss");
                    return (<div key={blog._id}>
                        <h1>{blog.blogTitle}</h1>
                        <div>{blog.blogContent}</div>
                        <div>{dateStr}</div>
                    </div>);
                }
            );
        }
        return (
            <div>
                {blogListView}
            </div>
        );
    }
}
export default Home;