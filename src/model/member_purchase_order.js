export default {
    namespace: 'member_purchase_order',

    state: {
        scroll_top: 0,
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
