export default {
    namespace: 'shop',

    state: {
        is_load: false,
        category_list: [],
        product_list: [],
        scroll_top: 0,
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
