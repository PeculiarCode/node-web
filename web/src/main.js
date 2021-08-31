import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/index.scss'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import wx from 'weixin-js-sdk'
import { request } from '@/utils/axios'
SwiperCore.use([Pagination, Autoplay])

const app = createApp(App)

// app.config.globalProperties.$wx = wx
app.config.globalProperties.$axios = request
app.use(router)
app.use(ElementPlus)
app.mount('#app')

