export default {
    namespace: 'knowledge',

    state: {
        is_load: false
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        },
    },

};
