import React, {Component} from "react";
import {connect} from "dva";
import {createForm} from "rc-form";
import {ActivityIndicator, WhiteSpace, List, InputItem, Item, Picker} from "antd-mobile";


const seasons = [
    [
        {
            label: '微信授权',
            value: '微信授权',
        },
        {
            label: '其它',
            value: '其它',
        }
    ]
];

class CertificateOtherAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            value: '',
            is_channel: false
        }
    }

    componentDidMount() {
        document.title = '其它品台授权书';
        document.body.scrollTop = 0;

        this.setState({
            is_load: true
        });
    }

    componentWillUnmount() {

    }
    onChange(value) {
        if(value[0] === '其它'){
            this.setState({
                value: value,
                is_channel: true
            })
        } else {
            this.setState({
                value: value,
                is_channel: false
            })
        }
    }


    render() {
        const Item = List.Item;
        console.log(this.state);

        return (
            <div>
                <WhiteSpace size="lg"/>
                <Picker
                    onChange={this.onChange.bind(this)}
                    value={this.state.value}
                    data={seasons}
                    cascade={false}
                >
                    <Item arrow="horizontal" className="province-city-area">渠道:</Item>
                </Picker>
                <WhiteSpace size="lg"/>
                {
                    this.state.is_channel?
                    <List>
                        <InputItem
                            clear
                            placeholder="请输入渠道名称"
                        >渠道名:</InputItem>
                        <InputItem
                            clear
                            placeholder="请输入渠道地址"
                        >渠道地址:</InputItem>
                    </List>:null
                }
                <WhiteSpace size="lg"/>
                <List>
                    <InputItem
                        clear
                        placeholder="请输入店铺名"
                    >店铺名:</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入店铺地址"
                    >店铺地址:</InputItem>
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

export default connect(() => ({}))(CertificateOtherAdd);
