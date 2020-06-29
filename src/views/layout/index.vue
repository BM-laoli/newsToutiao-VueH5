<template>
  <div class="layout-container">
    <router-view></router-view>
      <van-tabbar v-model="active" route>
        <van-tabbar-item to="/">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item  to="/qa">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
            <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/video">
           <i slot="icon" class="toutiao toutiao-shipin"></i>
            <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/mine">
           <i slot="icon" class="toutiao toutiao-wode"></i>
            <span class="text"> {{this.$store.state.user ? '我的' : '未登录'}} </span>
        </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
  export default {
    name:'layout',
    data() {
      return {
        // 控制默认选中红的项，开启路由模式之后这个就没有作用了
        active: 0
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layout-container {
    .toutiao {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    } 
  }

</style>