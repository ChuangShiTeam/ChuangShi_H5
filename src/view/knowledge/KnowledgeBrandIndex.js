import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from "dva/router";
import {WhiteSpace, List} from 'antd-mobile';

class KnowledgeBrandIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false
        }
    }

    componentDidMount() {
        document.title = '品牌知识';

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
                        <div className="list-item-image">
                            <img src={require('../../assets/image/vlab.png')} alt=""/>
                        </div>
                        <div className="list-item-name">
                            V+Lab
                        </div>
                    </Item>
                </List>
            </div>
        );
    }
}

export default connect(() => ({}))(KnowledgeBrandIndex);
