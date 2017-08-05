import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from "dva/router";
import {WhiteSpace, List, Badge} from 'antd-mobile';

class KnowledgeIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '星创商学院';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    handleBrand() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/brand/index',
            query: {}
        }));
    }

    handleBeginner() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/beginner/index',
            query: {}
        }));
    }

    handleVideo() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/video/index',
            query: {}
        }));
    }

    handleActivity() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/activity/index',
            query: {}
        }));
    }

    handleEliten() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/eliten/index',
            query: {}
        }));
    }

    handleIecturer() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/iecturer/index',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item multipleLine>
                        <div className="manage-item" onClick={this.handleBrand.bind(this)}>
                            <Badge text="">
                                <img src={require('../../assets/svg/upstage.svg')} alt=""/>
                            </Badge>
                            <div className="manage-item-text">品牌知识</div>
                        </div>
                        <div className="manage-item manage-item-left"
                             onClick={this.handleBeginner.bind(this)}>
                            <Badge text="">
                                <img src={require('../../assets/svg/paint.svg')} alt=""/>
                            </Badge>
                            <div className="manage-item-text">新手入门</div>
                        </div>
                    </Item>
                    <Item multipleLine>
                        <div className="manage-item" onClick={this.handleVideo.bind(this)}>
                            <Badge text="">
                                <img src={require('../../assets/svg/keyboard.svg')} alt=""/>
                            </Badge>
                            <div className="manage-item-text">视频教学</div>
                        </div>
                        <div className="manage-item manage-item-left" onClick={this.handleActivity.bind(this)}>
                            <img src={require('../../assets/svg/focus.svg')} alt=""/>
                            <div className="manage-item-text">线下活动</div>
                        </div>
                    </Item>
                    <Item multipleLine>
                        <div className="manage-item" onClick={this.handleEliten.bind(this)}>
                            <Badge text="">
                                <img src={require('../../assets/svg/female.svg')} alt=""/>
                            </Badge>
                            <div className="manage-item-text">精英课程</div>
                        </div>
                        <div className="manage-item manage-item-left" onClick={this.handleIecturer.bind(this)}>
                            <img src={require('../../assets/svg/creative.svg')} alt=""/>
                            <div className="manage-item-text">特邀讲师</div>
                        </div>
                    </Item>
                </List>
            </div>
        );
    }
}

export default connect(({knowledge}) => ({knowledge}))(KnowledgeIndex);
