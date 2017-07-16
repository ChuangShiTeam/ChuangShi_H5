export default {

    namespace: 'category',

    state: {
        category_list: [],
        product_list: []
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
