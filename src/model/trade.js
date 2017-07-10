export default {

  namespace: 'product',

  state: {
    is_load: false,
    product_quantity: 0,
    product_quantity_min: 0,
    product_total: 0,
    product_id: '',
    product_name: '',
    product_image_file: '',
    product_image_file_list: [],
    product_price: 0,
    product_stock: 0,
    sku_id: '',
    product_content: ''
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.data };
    },
  },

};
