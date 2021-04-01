import axios from 'axios';
import { createStore } from 'vuex'
import { getToken, getAdminToken } from '../helpers/token'

export default createStore({
    state: {
        articleDetail: {},
        articleStatus:'',
        userInfo: {},
        adminInfo: {},
        userStatus: false,
        adminStatus: false,
        userCharacter: 'member',
    },
    mutations: {
        setUserInfo(state, userInfo) {
            console.log(Date());
            state.userInfo = userInfo;
        },
        setAdminInfo(state, adminInfo) {
            // console.log(Date());
            state.adminInfo = adminInfo;
        },
        setUserStatus(state, userStatus) {
            state.userStatus = userStatus;
        },
        setAdminStatus(state, adminStatus) {
            state.adminStatus = adminStatus;
        },
        setArticleDetail(state, articleDetail) {
            state.articleDetail = articleDetail;
        },
        setArticleStatus(state, articleStatus) {
            state.articleStatus = articleStatus;
        },
        setUserCharacter(state, userCharacter) {
            state.userCharacter = userCharacter;
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
        
        async getAdminStatus(store) {
            const { data } = await axios.get(
                '/character/info', 
                {
                    headers: {
                        'Authorization': `Bearer ${getAdminToken()}`
                    }
                }
            );
            console.log(data)
            store.commit('setAdminInfo', data);
            store.commit('setAdminStatus', true);
            return data;
        }
        
    },
});