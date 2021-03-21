import { createRouter, createWebHistory } from 'vue-router'
import View from './components/View.vue'
import Login from './components/Login.vue'
// import Register from '../components/Register.vue'
import Article from './components/Article.vue'
// import Account from './components/Account.vue'
// import Test from './components/test.vue'

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
        }
    ]
})

router.afterEach(() => {
    window.scrollTo(0,0);
})

export default router;