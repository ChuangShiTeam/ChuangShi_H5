import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, WhiteSpace, List, Steps} from 'antd-mobile';

import constant from "../util/constant";
import http from "../util/http";

class ExpressIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            express: {},
            express_traces_list: []
        }
    }

    componentDidMount() {
        document.title = '查看物流';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/express/find',
            data: {
                express_id: this.props.params.express_id
            },
            success: function (data) {
                this.setState({
                    express: data
                });

                if (data.express_traces_list !== null) {
                    var express_traces_list = data.express_traces_list;
                    var temp = [];
                    for (let i = 0; i < express_traces_list.length; i++) {
                        temp.push(express_traces_list[express_traces_list.length - 1 - i]);
                    }

                    this.setState({
                        express_traces_list: temp
                    });
                }
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }


    render() {
        const Item = List.Item;
        const Step = Steps.Step;
        const Brief = Item.Brief;

        return (
            <div>
                <List>
                    <Item wrap multipleLine>
                        <img className="express-traces-image" src={constant.host + this.state.express.product_image}
                             alt={this.state.express.product_name}/>
                        <div className="express-traces-text">
                            <Brief>物流状态：{this.state.express.express_flow}</Brief>
                            <Brief>承运来源：{this.state.express.express_shipper_code}</Brief>
                            <Brief>运单编号：{this.state.express.express_no}</Brief>
                        </div>
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <List>
                    <Item>
                        本数据由快递鸟提供
                    </Item>
                </List>
                {this.state.express_traces_list.length === 0 ?
                    ""
                    :
                    <List>
                        <Item>
                            <Steps>
                                {
                                    this.state.express_traces_list.map((item, index) => {
                                        return (
                                            <Step
                                                key={index}
                                                icon={index === 0 ? "check-circle-o" : ""}
                                                title={
                                                    <div className="traces-item-content">
                                                        <div>{item.AcceptStation}</div>
                                                        <div>{item.AcceptTime}</div>
                                                    </div>
                                                }
                                            />
                                        );
                                    })
                                }
                            </Steps>
                        </Item>
                    </List>}
                <WhiteSpace size="lg"/>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(ExpressIndex);
