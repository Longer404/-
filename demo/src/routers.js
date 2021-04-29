import { createRouter, createWebHistory } from 'vue-router'
import View from './components/View.vue'
import Login from './components/Login.vue'
// import Register from '../components/Register.vue'
import Article from './components/Article.vue'
// import Account from './components/Account.vue'
import Test from './components/test.vue'
// import Homeview from './components/Homeview.vue'
import store from './store'
// import axios from 'axios'
import { ElMessage } from 'element-plus'
// import Cardbox from './components/Cardbox.vue'
import { getToken, getAdminToken } from './helpers/token'
// import Testpage1 from './components/testpage1.vue'
// import Testpage2 from './components/testpage2.vue'


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
            // redirect:'/home',
            component: View,
            
        },
        // {
        //     path: '/home',
        //     component: Homeview,
        //     children: [
        //         {
        //             path: 'testpage1',
        //             component: Testpage1
        //         },
        //         {
        //             path: 'testpage2',
        //             component: Testpage2
        //         }
        //     ]
        // },
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
            path: '/article/detail/:id',
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
            // redirect: '/',
            component: Test,
            // meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/message',
            name: 'message',
            // component: Register,
            component: () => import('./components/Message.vue')
        },
        {
            path: '/adminpage',
            name: 'adminpage',
            // component: Register,
            component: () => import('./components/Adminpage.vue')
        },
        {
            path: '/adminlogin',
            name: 'adminlogin',
            // component: Register,
            component: () => import('./components/Adminlogin.vue')
        },
        {
            path: '/search/:keyword',
            name: 'search',
            // component: Register,
            component: () => import('./components/Search.vue')
        },
        {
            path: '/space/:id',
            name: 'space',
            component: () => import('./components/Space.vue')
            // component: () => import('./components/Article.vue')
        }
    ]
})

router.afterEach(() => {
    window.scrollTo(0,0);
});

router.beforeEach(async (to, from, next) => {

    // console.log(store.state.userInfo.data);
    // let res = {};
    if (getToken() !== '') {
        console.log('本地已登录')
        // console.log(store.state.userInfo.data)
        // console.log(1)
        // store.dispatch('getUserInfo');
        // store.commit('setUserStatus', false);

        store.dispatch('getUserInfo');
        store.commit('setUserStatus', true);
    } 
    if (getAdminToken() !== '') {
        console.log('本地管理员已登录')
        store.dispatch('getAdminStatus');
        store.dispatch('getTotalData');
        store.dispatch('getTotalPartition');
    } 
    if (getToken() === '' && to.path !== '/adminpage') {
        // console.log(3)
        // console.log(!store.state.userInfo.data)
        console.log('本地不存在登录信息');
        // store.dispatch('getUserInfo');
        store.commit('setUserStatus', false);
    }
    if (getAdminToken() === '' && to.path === '/adminpage') {
        console.log('本地不存在登录信息');
        next({ path: '/adminlogin' });
    }

    if(store.state.userStatus === false) {
        // store.dispatch('getUserInfo');
        if (to.path === '/form' || to.path === '/account'){
            ElMessage.error('请先登录账户');
            next({ path: '/' });
            return;
        }
        next();
    } else if (store.state.userStatus === true){
        if(to.path === '/login' || to.path === '/register') {
            next({ path: '/' });
            return;
        }
        next();
    }
    // 一个beforeEach只能使用一个next，因此所有的next都只能用在一个判断中
    // 其实就是因为每次next跳转都会触发一次beforeEach，而触发之后又会重新判断
    // 造成多层的嵌套判断
    // if(to.path === '/account' && store.state.userStatus === false) {
        // store.dispatch('getUserInfo');
        
    //     ElMessage.error('请先登录账户');
    //     next({ path: '/login' });
    //     return;
    // } else {
    //     next();
    // }
    
    // if(to.path === '/login' || to.path === '/register') {
    //     if (store.state.userStatus === true) {
            // store.dispatch('getUserInfo');
            
            // console.log('重定向');
            // console.log(store.state.userStatus);
            // ElMessage.error('请先登录账户');
    //         next({ path: '/test' });
    //         return;
    //     } else {
    //         console.log('重定向2');
    //         next();
    //     }
        
    // } else {
    //     console.log('重定向3');
    //     next();
    // }
    // next();
});

export default router;