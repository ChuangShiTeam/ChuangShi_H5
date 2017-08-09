import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
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
                        onClick={this.handleItem.bind(this, "77b9d917d31e41ce82676a9c69430ca0")}
                    >
                        V+Lab 爆水丸产品知识Beauty Book
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "1b9638d9bf3e429f9fcc91cdfa9a9d81")}
                    >
                        企业背景 品牌故事
                    </Item>
                    <Item
                        arrow="horizontal"
                        onClick={this.handleItem.bind(this, "e8d6d187c39d4a81a2b007af2ede4f4b")}
                    >
                        爆水丸产品资质
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
