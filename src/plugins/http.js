import axios from 'axios'
import store from '@/store';

const http = axios.create( { 
  baseURL:'http://ttapi.research.itcast.cn/',
} )

const { user } = store.state;

// 请求拦截器
http.interceptors.request.use( 
(config)=>{
      if (user.token) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`;
      }  
  return config 
},
(err)=>{
  console.log(err)
  return Promise.reject(err);     
} )



export default http

// 请求拦截器
// 响应拦截器
