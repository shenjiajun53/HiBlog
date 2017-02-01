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
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: 1,
            avatarUrl: ""
        }
    }

    componentDidMount() {
        uploadInput = this.refs.uploadInput;
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
        console.info("event=" + uploadInput.files.length);
        let objectURL = window.URL.createObjectURL(uploadInput.files[0]);
        console.info("event=" + objectURL);
        this.setState({
            avatarUrl: objectURL
        });
        window.URL.revokeObjectURL(objectURL);
    }

    render() {
        return (
            <div>
                <h1>注册</h1>
                <div>
                    <Card style={{width: "20em", padding: "1em"}}>
                        <div>
                            用户名*
                        </div>
                        <TextField/>
                        <div>
                            密码*
                        </div>
                        <TextField/>
                        <div>
                            重复密码*
                        </div>
                        <TextField/>

                        <SelectField
                            floatingLabelText="性别*"
                            value={this.state.selectedGender}
                            onChange={(event, index, value) => this.genderSelected(event, index, value)}
                        >
                            <MenuItem value={1} primaryText="男"/>
                            <MenuItem value={2} primaryText="女"/>
                            <MenuItem value={3} primaryText="保密"/>
                        </SelectField>
                        <div>
                            头像*
                        </div>
                        <RaisedButton onTouchTap={() => this.onUpLoadClick()} label={"选择文件"}/>
                        <input type="file"
                               multiple="multiple"
                               accept="image/*"
                               ref="uploadInput"
                               style={{display: "none"}}
                               onChange={(event) => this.avatarSelected(event)}
                        />
                        <div>
                            个人简介*
                        </div>
                        <img src={this.state.avatarUrl}/>
                        <TextField/>
                    </Card>
                </div>
            </div>
        );
    }
}
export default SignUp;