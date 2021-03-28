import axios from 'axios';
import { createStore } from 'vuex'
import { getToken } from '../helpers/token'

export default createStore({
    state: {
        articleDetail: {},
        articleStatus:'',
        userInfo: {},
        userStatus: false,
    },
    mutations: {
        setUserInfo(state, userInfo) {
            console.log(Date());
            state.userInfo = userInfo;
        },
        setUserStatus(state, userStatus) {
            state.userStatus = userStatus;
        },
        setArticleDetail(state, articleDetail) {
            state.articleDetail = articleDetail;
        },
        setArticleStatus(state, articleStatus) {
            state.articleStatus = articleStatus;
        }
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
            console.log('getUserInfo');
            console.log(data);
            store.commit('setUserInfo', data);
            store.commit('setUserStatus', true);
            return data;
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