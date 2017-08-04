export default {
    namespace: 'my',

    state: {
        is_load: false,
        user_name: '',
        user_avatar: '',
        member_level_id: '',
        member_level_name: '',
        member_level_value: 999,
        member_commission_amount: 0,
        member_order_amount: 0,
        member_wait_pay: 0,
        member_wait_send: 0,
        member_wait_receive: 0,
        member_status: false,
        bill_amount: 0.00,
        certificate_amount: 0.00
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
