import React, {Component} from "react";
import {connect} from "dva";
import {ActivityIndicator, WhiteSpace, List, InputItem} from "antd-mobile";

class CertificateWechatAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '微信授权书';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    render() {

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <InputItem
                        clear
                        placeholder="请输您的姓名"
                    >姓名:</InputItem>
                    <InputItem
                        clear
                        placeholder="请输您的手机"
                    >手机号码:</InputItem>
                    <InputItem
                        clear
                        placeholder="请输您的证件号"
                    >身份证:</InputItem>
                </List>

                <div className="footer">
                    <div
                        className="footer-buttom"
                    >
                        新增
                    </div>
                </div>

                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(CertificateWechatAdd);
