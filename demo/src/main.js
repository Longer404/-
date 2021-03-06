import { createApp } from 'vue'
import App from './App.vue'
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './routers'
import TestSlot from './components/UploadImg.vue'
import store from './store'
import ECharts from 'vue-echarts'
import { use } from "echarts/core";
// import { getToken } from './helpers/token'
import {
    CanvasRenderer
  } from 'echarts/renderers'
  import {
    BarChart
  } from 'echarts/charts'
  import {
    GridComponent,
    TooltipComponent
  } from 'echarts/components'
  
  use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent
  ]);

axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

// createApp(App).mount('#app')
const app = createApp(App);
// app.use(Antd);
app.use(router)
app.use(store)
app.use(ElementPlus)
app.component('v-chart', ECharts)
app.component('test-slot',TestSlot)
app.mount('#app')
