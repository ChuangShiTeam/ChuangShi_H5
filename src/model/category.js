export default {
    namespace: 'category',

    state: {
        is_load: false,
        category_list: [],
        product_list: [],
        product_show_list: []
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
