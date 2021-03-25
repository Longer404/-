import { createRouter, createWebHistory } from 'vue-router'
import View from './components/View.vue'
import Login from './components/Login.vue'
// import Register from '../components/Register.vue'
import Article from './components/Article.vue'
// import Account from './components/Account.vue'
import Test from './components/test.vue'
import store from './store'
// import axios from 'axios'
import { ElMessage } from 'element-plus'
// import Cardbox from './components/Cardbox.vue'
import { getToken } from './helpers/token'

// const routes = [
//     {
//         path: '/',
//         name: 'home',
//         component: View
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: Login,
//         // meta: { redirectAlreadyLogin: true }
//     },
//     {
//         path: '/reguster',
//         name: 'register',
//         // component: Register,
//         component: () => import('../components/Register.vue')
//         // meta: { redirectAlreadyLogin: true }
//     },
// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: View,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            // meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/register',
            name: 'register',
            // component: Register,
            component: () => import('./components/Register.vue')
            // meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/form',
            name: 'form',
            // component: Register,
            component: () => import('./components/Form.vue')
            // meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article,
            // component: () => import('./components/Article.vue')
        },
        {
            path: '/account',
            name: 'account',
            // component: Register,
            component: () => import('./components/Account.vue')
            // meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/test',
            name: 'test',
            component: Test,
            // meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/testpage',
            name: 'testpage',
            // component: Register,
            component: () => import('./components/testpage.vue')
        }
    ]
})

router.afterEach(() => {
    window.scrollTo(0,0);
});

router.beforeEach(async (to, from, next) => {

    // let res = {};
    if(getToken() !== '') {
        console.log('本地已登录')
        // console.log(store.state.userInfo.data)
        // console.log(1)
        // store.dispatch('getUserInfo');
        // store.commit('setUserStatus', false);
        store.dispatch('getUserInfo');
        store.commit('setUserStatus', true);
    } else {
        // console.log(3)
        // console.log(!store.state.userInfo.data)
        console.log('本地不存在登录信息')
        // store.dispatch('getUserInfo');
        store.commit('setUserStatus', false);
    }

    if(to.path === '/form' && store.state.userStatus === false) {
        // store.dispatch('getUserInfo');
        
        ElMessage.error('请先登录账户');
        next({ path: '/login' });
        return;
    } else {
        next();
    }
    
    if(to.path === '/account' && store.state.userStatus === false) {
        // store.dispatch('getUserInfo');
        
        ElMessage.error('请先登录账户');
        next({ path: '/login' });
        return;
    } else {
        next();
    }
    // next();
});

export default router;