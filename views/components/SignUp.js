/**
 * Created by shenjiajun on 2017/1/29.
 */
import React, {Component} from 'react';
import TextField from "material-ui/TextField"
import Card from "material-ui/Card"
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';


let uploadInput;
let userNameTF;
let passTF;
let passConfirmTF;
let userIntroTF;
let file;
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: 1,
            avatarUrl: "",
            selectedFileName: "",
            nameError: "",
            passError: "",
            passConfirmError: "",
            userIntroError: ""
        }
    }

    componentDidMount() {
        uploadInput = this.refs.uploadInput;
        userNameTF = this.refs.userNameTF;
        passTF = this.refs.passTF;
        passConfirmTF = this.refs.passConfirmTF;
        userIntroTF = this.refs.userIntroTF;
    }

    genderSelected(event, index, value) {
        // console.log("genderSelected="+value);
        this.setState({
            selectedGender: value
        })
    }

    onUpLoadClick() {
        // console.info("onUpLoadClick=");
        uploadInput.click();
    }

    avatarSelected(event) {
        // console.info("event=" + uploadInput.files.length);
        file = uploadInput.files[0];
        console.info("file=" + file.name);
        this.setState({
            selectedFileName: file.name
        });
        // let objectURL = window.URL.createObjectURL(file);
        // console.info("event=" + objectURL);
        // window.URL.revokeObjectURL(objectURL);
    }

    onSignUp() {
        let userNameStr = userNameTF.getValue();
        let passStr = passTF.getValue();
        let passConfirmStr = passConfirmTF.getValue();
        let userIntroStr = userIntroTF.getValue();

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
        if ("" === passConfirmStr) {
            this.setState({
                passConfirmError: "不能为空"
            });
            infoFinished = false;
        }
        if (passConfirmStr !== passStr) {
            this.setState({
                passError: "密码不一致",
                passConfirmError: "密码不一致"
            });
            infoFinished = false;
        }
        if (!infoFinished) {
            return;
        }


        console.info("upload =" + userNameStr + passStr + passConfirmStr + userIntroStr);

        console.log("url=" + location.href);


        // let request = new Request(location.href);
        // request.append("userNameStr", userNameStr);
        // request.append("passStr", passStr);
        // request.append("passConfirmStr", passConfirmStr);
        // request.append("userIntroStr", userIntroStr);

        let body = {
            "userName": userNameStr,
            "pass": passStr,
            "passConfirm": passConfirmStr,
            "userIntro": userIntroStr
        };
        let demoBody = {
            "userName": "shenjiajun",
            "pass": "12345",
            "passConfirm": "12345",
            "userIntro": "啦啦啦"
        };
        let data = "userName=shenjiajun&pass=12345&userIntro=啦啦啦";

        let url = "/api/SignUp";
        // let url = location.href;

        document.cookie = "cookie1=5006";

        let formData = new FormData();
        formData.append('avatar', file);
        formData.append('userName', userNameStr);
        formData.append('pass', passStr);
        formData.append('passConfirm', passConfirmStr);
        formData.append('userIntro', userIntroStr);


        fetch(url, {
            method: "post",
            // body: data,
            body: formData,
            headers: {
                // 'Content-Type': 'application/json'
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
                if (json.redirect) {
                    window.location = json.redirect;
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
                <h1 style={{display: "none"}}>注册</h1>
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
                                                       nameError: ""
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
                                                   passError: ""
                                               })
                                           }
                                       }}
                                       type="password"
                                       ref="passTF"
                                       id="passTF"
                                       name="passTF"/>
                            <div>
                                重复密码*
                            </div>
                            <TextField style={{marginBottom: "1em"}}
                                       errorText={this.state.passConfirmError}
                                       onChange={(event, str) => {
                                           if (this.state.passConfirmError !== "") {
                                               this.setState({
                                                   passConfirmError: ""
                                               })
                                           }
                                       }}
                                       type="password"
                                       ref="passConfirmTF"
                                       id="passConfirmTF"
                                       name="passConfirmTF"/>

                            <SelectField
                                floatingLabelText="性别*"
                                value={this.state.selectedGender}
                                style={{marginBottom: "1em"}}
                                onChange={(event, index, value) => this.genderSelected(event, index, value)}
                            >
                                <MenuItem value={1} primaryText="男"/>
                                <MenuItem value={2} primaryText="女"/>
                                <MenuItem value={3} primaryText="保密"/>
                            </SelectField>
                            <div style={{marginBottom: "1em"}}>
                                <span>头像*</span>
                                <RaisedButton onTouchTap={() => this.onUpLoadClick()}
                                              label={"选择文件"}
                                              secondary={true}
                                              style={{marginLeft: "0.5em"}}
                                />
                            </div>
                            <div style={{marginBottom: "1em",}}>
                                {this.state.selectedFileName}
                            </div>
                            <input type="file"
                                   multiple="multiple"
                                   accept="image/*"
                                   ref="uploadInput"
                                   name="uploadInput"
                                   style={{display: "none"}}
                                   onChange={(event) => this.avatarSelected(event)}
                            />
                            <div>
                                个人简介*
                            </div>
                            <TextField style={{marginBottom: "1em"}}
                                       multiLine={true}
                                       rows={5}
                                       errorText={this.state.userIntroError}
                                       ref="userIntroTF"
                                       id="userIntroTF"
                                       name="userIntroTF"/>

                            <RaisedButton onTouchTap={() => this.onSignUp()}
                                          primary={true}
                                          label={"注册"}
                                          style={{width: "10em", alignSelf: "center"}}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
export default SignUp;