export default {
    namespace: 'article_index',

    state: {
        is_load: false
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
