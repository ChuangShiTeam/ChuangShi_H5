import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from "dva/router";
import {WhiteSpace, List} from 'antd-mobile';

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

    handleItem(article_id) {
        this.props.dispatch(routerRedux.push({
            pathname: '/knowledge/article/detail/' + article_id,
            query: {},
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
                        onClick={this.handleItem.bind(this, "ec4ef316fd014f1194ad5d20414b8e57")}
                    >
                        个创入门第一课
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "a4d7a1912dad4c9c910d24cece147e71")}
                    >
                        第二节 个创者所需要具备的五大要素
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "259048e9067f4990b6781410273738f2")}
                    >
                        第三节营销架构基础
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "0")}
                    >
                        新手的导入方法
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "0")}
                    >
                        营销课件一、营销架构评书
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "0")}
                    >
                        营销课件二、如何打造朋友圈
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "0")}
                    >
                        营销课件三、找到你的目标用户
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "0")}
                    >
                        营销课件四、吸粉的方法
                    </Item>
                </List>
            </div>
        );
    }
}

export default connect(() => ({}))(KnowledgeBeginnerIndex);
