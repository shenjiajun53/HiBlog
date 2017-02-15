/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';
import TextField from "material-ui/TextField"
import Card from "material-ui/Card"
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';


let userNameTF;
let passTF;
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFileName: "",
            nameError: "",
            passError: "",
        }
    }

    componentDidMount() {
        userNameTF = this.refs.userNameTF;
        passTF = this.refs.passTF;
    }

    onSignIn() {
        let userNameStr = userNameTF.getValue();
        let passStr = passTF.getValue();

        let infoFinished = true;
        if ("" === userNameStr) {
            this.setState({
                nameError: "不能为空"
            });
            infoFinished = false;
        }
        if ("" === passStr) {
            this.setState({
                passError: "不能为空"
            });
            infoFinished = false;
        }
        if (!infoFinished) {
            return;
        }

        let body = {
            "userName": userNameStr,
            "pass": passStr,
        };
        let url = "/api/SignIn";
        fetch(url, {
            method: "post",
            // body: data,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded'
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
                    if (json.result.redirect) {
                        window.location = json.result.redirect;
                    }
                } else if (json.error) {
                    this.setState({
                        nameError: json.error.errorMsg,
                        passError: json.error.errorMsg
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
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div>
                    <Card style={{
                        marginTop: "1em",
                        width: "20em",
                    }}>
                        <div style={{
                            padding: "1em",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <div >
                                用户名*
                            </div>
                            <TextField style={{marginBottom: "1em", flex: 1}}
                                       errorText={this.state.nameError}
                                       onChange={
                                           (event, str) => {
                                               if (this.state.nameError !== "") {
                                                   this.setState({
                                                       nameError: "",
                                                       passError: ""
                                                   })
                                               }
                                           }}
                                       ref="userNameTF"
                                       id="userNameTF"
                                       name="userNameTF"/>
                            <div>
                                密码*
                            </div>
                            <TextField style={{marginBottom: "1em"}}
                                       errorText={this.state.passError}
                                       onChange={(event, str) => {
                                           if (this.state.passError !== "") {
                                               this.setState({
                                                   nameError: "",
                                                   passError: ""
                                               })
                                           }
                                       }}
                                       type="password"
                                       ref="passTF"
                                       id="passTF"
                                       name="passTF"/>
                            <RaisedButton onTouchTap={() => this.onSignIn()}
                                          primary={true}
                                          label={"登录"}
                                          style={{width: "10em", alignSelf: "center"}}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
export default SignIn;