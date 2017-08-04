export default {
    namespace: 'product_brand',

    state: {
        is_load: false,
        list: [],
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
