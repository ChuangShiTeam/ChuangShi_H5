import React, {Component} from 'react';
import {connect} from 'dva';
import {ActivityIndicator, WhiteSpace, List} from 'antd-mobile';

class KnowledgeBrandDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '星创商学院';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleItem() {
        
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <List>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        个创入门第一课
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        心态与执行力
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        如何选择品牌
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        新手的导入方法
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        营销课件一、营销架构评书
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        营销课件二、如何打造朋友圈
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        营销课件三、找到你的目标用户
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this)}
                    >
                        营销课件四、吸粉的方法
                    </Item>
                </List>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(KnowledgeBrandDetail);
