/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';
import TextField from "material-ui/TextField"
import Card from "material-ui/Card"
import RaisedButton from 'material-ui/RaisedButton';

let titleTF;
let contentTF;
class WriteBlog extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        titleTF = this.refs.titleTF;
        contentTF = this.refs.contentTF;
    }

    sendBlog() {
        let titleStr = titleTF.getValue();
        let contentStr = contentTF.getValue();

        console.log("titleStr=" + titleStr + " contentStr=" + contentStr);

        let blog = {
            blogTitle: titleStr,
            blogContent: contentStr
        };

        let url = "/api/sendBlog";
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
                if (json.result) {
                    let result = json.result;
                    if (result.blogId) {
                        window.location = result.redirect + "/" + result.blogId;
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
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Card style={{
                    marginTop: "1em",
                    width: "20em",
                }}>
                    <div style={{
                        padding: "1em",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <div>
                            标题
                        </div>
                        <TextField style={{marginBottom: "1em"}}
                                   ref="titleTF"
                                   id="titleTF"
                                   name="titleTF"/>

                        <div>
                            内容
                        </div>
                        <TextField style={{marginBottom: "1em"}}
                                   multiLine={true}
                                   rows={5}
                                   ref="contentTF"
                                   id="contentTF"
                                   name="contentTF"/>

                        <RaisedButton onTouchTap={() => this.sendBlog()}
                                      primary={true}
                                      label={"发布"}
                                      style={{width: "10em", alignSelf: "center"}}
                        />
                    </div>
                </Card>
            </div>
        );
    }
}
export default WriteBlog;