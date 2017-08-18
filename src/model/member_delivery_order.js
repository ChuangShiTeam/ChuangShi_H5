export default {
    namespace: 'member_delivery_order',

    state: {
        scroll_top: 0,
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
