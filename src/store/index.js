
import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0,
            user: '',
        }
    },
    mutations: {
        increment(state) {
            state.count++;
        },

        getUser(state, n) {
            state.user = n;
        },
    }
})

export default store;
 