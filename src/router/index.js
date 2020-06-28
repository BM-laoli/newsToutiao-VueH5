import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录
const login = () => import ( '../views/login/index')
const layout = () => import ( '../views/layout/index')
const home = () => import ( '../views/home/index')
const qa = () => import ( '../views/qa/index')
const video = () => import ( '../views/video/index')
const mine = () => import ( '../views/mine/index')

Vue.use(VueRouter)

  const routes = [
    { 
      path:'/login',
      name:'login',
      component:login
    },{
      path:'/',
      name:'layout',
      component:layout,
      children:[
        { 
          path:'', // 默认子路由,为空就是子路由
          name:'home',
          component:home
        },
        { 
          path:'/qa',
          name:'qa',
          component:qa
        },
        { 
          path:'/video',
          name:'video',
          component:video
        },
        { 
          path:'/mine',
          name:'my',
          component:mine
        }
      ]
    }
]

const router = new VueRouter({
  routes
})

export default router
