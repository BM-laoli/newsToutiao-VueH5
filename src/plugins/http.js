import axios from 'axios'
import store from '@/store';

const http = axios.create( { 
  baseURL:'http://ttapi.research.itcast.cn/',
} )

// 请求拦截器
http.interceptors.request.use( 
(config)=>{
      // 如果有user 如果有 token注意啊，这个要小心使用
      if ( store.state.user && store.state.user.token) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`;
      }  
  return config 
},
(err)=>{
  console.log(err)
  return Promise.reject(err);     
} )



export default http