import Vue from 'vue'
import Vuex from 'vuex'

// 封装抽离
import { getItem,setItm,removeItem } from '../utils/storage'
Vue.use(Vuex)
// 类型常量
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储当前数据,结合使用vuex还有localStorage
    user:getItem( TOKEN_KEY )
  },
  mutations: {
    initUer( state,payload ){
      state.user = payload
      setItm( TOKEN_KEY,payload )
    },
    deletUser( state ) {
      state.user = null
      removeItem( TOKEN_KEY )
    } 
  },
  actions: {
  },
  modules: {
  }
})
