import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from "dva/router";
import {WhiteSpace, List, Badge} from 'antd-mobile';

class KnowledgeBeginnerIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '新手入门';

        document.body.scrollTop = 0;
    }

    componentWillUnmount() {

    }

    handleBrand() {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/brand/detail',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        个创入门第一课
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        心态与执行力
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        如何选择品牌
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        新手的导入方法
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        营销课件一、营销架构评书
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        营销课件二、如何打造朋友圈
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        营销课件三、找到你的目标用户
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleBrand.bind(this)}
                    >
                        营销课件四、吸粉的方法
                    </Item>
                </List>
            </div>
        );
    }
}

export default connect(() => ({}))(KnowledgeBeginnerIndex);
