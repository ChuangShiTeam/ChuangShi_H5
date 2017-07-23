import constant from '../util/constant';

export default {
    namespace: 'category',

    state: {
        category_list: constant.category.concat(),
        product_list: [],
        product_show_list: []
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
