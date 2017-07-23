export default {
    namespace: 'cart',

    state: {
        is_load: false
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
