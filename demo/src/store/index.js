import axios from 'axios';
import { createStore } from 'vuex'
import { getToken, setToken, getAdminToken } from '../helpers/token'

export default createStore({
    state: {
        articleDetail: {},
        articleStatus:'',
        userInfo: {},
        adminInfo: {},
        userStatus: false,
        adminStatus: false,
        userCharacter: 'member',
        totalData:[],
        totalPartition:[]
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
        },
        setTotalData(state, totalData) {
            state.totalData = totalData;
        },
        setTotalPartition(state, totalPartition) {
            state.totalPartition = totalPartition;
        },
    },
    actions: {
        async getUserInfo(store) {
            
            const {data} = await axios.get(
                '/user/info',
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
            );
            console.log('getUserInfo');
            console.log(data);
            if(data.code === 1){
                store.commit('setUserInfo', data.data);
                store.commit('setUserStatus', true);
                return data;
            } else {
                setToken('');
                alert(data.msg);
                window.location.href = '/';
            }
            
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
        },
        async getTotalData(store) {
            const {data} = await axios.get('/message/systemdata');
            var testdata = [
                data.data.totalUser, 
                data.data.totalArticle, 
                data.data.totalComment, 
                data.data.totalSemifinishedArticle
            ];
            // var test = [1,2];
            console.log(typeof testdata);
            // console.log(typeof test);
            store.commit('setTotalData', testdata);
        },
        
        async getTotalPartition(store) {
            const {data} = await axios.get('/message/totalpartition');
            // var totaldata = [
            //     { value: data.data.totalAnime, name: "动画资讯" },
            //     { value: data.data.totalComics, name: "漫画资讯" },
            //     {value: data.data.totalGame, name: "游戏相关"},
            //     {value: data.data.totalPeripheral, name: "动漫周边"},
            //     {value: data.data.totalDoujin, name: "同人创作"},
            //    { value: data.data.totalExhibition, name: "漫展消息" },
            // ];
            var totaldata = [
                data.data.totalAnime,
                data.data.totalComics,
                data.data.totalGame,
                data.data.totalPeripheral,
                data.data.totalDoujin,
                data.data.totalExhibition,
            ]
            // var test = [1,2];
            console.log( totaldata);
            // console.log(typeof test);
            store.commit('setTotalPartition', totaldata);
        }
    },
});