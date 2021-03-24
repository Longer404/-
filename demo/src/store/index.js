import axios from 'axios';
import { createStore } from 'vuex'
import { getToken } from '../helpers/token'

export default createStore({
    state: {
        userInfo: {},
        userStatus: false,
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setUserStatus(state, userStatus) {
            state.userStatus = userStatus;
        },
    },
    actions: {
        async getUserInfo(store) {
            
            const data = await axios.get(
                '/user/info',
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
            );
            store.commit('setUserInfo', data);
        },
        async getUserStatus(formData, store) {
            const { data } = await axios.post('/user/login', {
                email: formData.email,
                password: formData.password,
            });
            console.log(data)
            store.commit('setUserStatus', true);
        }
        
    },
});