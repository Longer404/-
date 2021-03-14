import { createApp } from 'vue'
import App from './App.vue'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'

// createApp(App).mount('#app')
const app = createApp(App);
// app.use(Antd);
app.use(ElementPlus)
app.mount('#app')