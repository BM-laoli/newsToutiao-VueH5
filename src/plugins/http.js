import axios from 'axios'

const http = axios.create( { 
  // baseURL:'http://ttapi.research.itcast.cn',
} )



export default http

// 请求拦截器
// 响应拦截器
