import React, {Component} from "react";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import {createForm} from "rc-form";
import {ActivityIndicator, WhiteSpace, List, Result, Icon, Button} from "antd-mobile";

class EnchashmentResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            bill_amount: 0.00
        }
    }

    componentDidMount() {
        document.title = '我要提现';

        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }

    handleManage() {
        this.props.dispatch(routerRedux.push({
            pathname: '/manage',
            query: {}
        }));
    }

    render() {
        const Item = List.Item;

        return (
            <div>
                <WhiteSpace size="lg"/>
                <Result
                    img={<Icon
                        type="check-circle"
                        style={{ fill: '#1F90E6', width: '1.2rem', height: '1.2rem' }}
                        alt=""
                    />}
                    title="申请提现成功"
                    message={<div>
                        <div
                            style={{
                                marginTop: '50px',
                                color: '#000',
                                lineHeight: 1,
                            }}
                        >
                            <span style={{ fontSize: '40px' }}>请耐心等待平台审核</span>
                        </div>
                    </div>}
                />
                <div style={{ margin: '100px 10px 0px 10px' }}>
                    <Button type="primary" onClick={this.handleManage.bind(this)}>返回管理</Button>
                </div>
                <WhiteSpace size="lg"/>
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(EnchashmentResult);
