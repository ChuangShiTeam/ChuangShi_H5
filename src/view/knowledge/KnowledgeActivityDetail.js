import React, {Component} from 'react';
import {connect} from 'dva';
import {WhiteSpace} from 'antd-mobile';

class KnowledgeActivityDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '线下活动';

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
                <img src={require('../../assets/image/WechatIMG573.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG574.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG575.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG576.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG577.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG578.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG579.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG580.jpg')} style={{width: '100%'}} alt=""/>
                <img src={require('../../assets/image/WechatIMG581.jpg')} style={{width: '100%'}} alt=""/>
                <WhiteSpace size="lg"/>
                <div style={{height: '100px'}}></div>
            </div>
        );
    }
}

export default connect(() => ({}))(KnowledgeActivityDetail);
