import { createApp } from 'vue'
import App from './App.vue'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './routers'
import TestSlot from './components/test.vue'

axios.defaults.baseURL = 'http://localhost:3000/'

// createApp(App).mount('#app')
const app = createApp(App);
// app.use(Antd);
app.use(router)
app.use(ElementPlus)
app.component('test-slot',TestSlot)
app.mount('#app')
