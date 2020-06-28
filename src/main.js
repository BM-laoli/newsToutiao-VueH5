import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// 全局样式初始化
import 'vant/lib/index.css'
import './assets/style/index.scss'
Vue.config.productionTip = false
// Vant组件库
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
