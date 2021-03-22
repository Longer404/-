import { createRouter, createWebHistory } from 'vue-router'
import View from './components/View.vue'
import Login from './components/Login.vue'
// import Register from '../components/Register.vue'
import Article from './components/Article.vue'
// import Account from './components/Account.vue'
import Test from './components/test.vue'
import store from './store'
// import Cardbox from './components/Cardbox.vue'

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
        }
    ]
})

router.afterEach(() => {
    window.scrollTo(0,0);
});

router.beforeEach(async (next) => {
    store.dispatch('getUserInfo');
    next;
});

export default router;