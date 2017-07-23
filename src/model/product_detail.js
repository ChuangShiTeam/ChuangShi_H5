export default {
    namespace: 'product_detail',

    state: {
        is_load: false,
        product_total: 0,
        product_id: '',
        product_name: '',
        product_image: '',
        product_content: '',
        product_sku_id: '',
        product_sku_price: 0,
        product_sku_total_price: 0,
        product_sku_quantity: 0,
        product_sku_min_quantity: 10
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
