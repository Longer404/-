import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
    state: {
        userInfo: {},
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        async getUserInfo(store) {
            const data = await axios.get('/user/info');
            store.commit('setUserInfo', data);
        }
        
        
    },
});