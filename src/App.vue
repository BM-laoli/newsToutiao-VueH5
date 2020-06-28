<template>
  <div id="app">
    <h2>初始化完成</h2>
    <i class="toutiao toutiao-shoucang"></i>
    <van-button type="default" @click="getData">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view/>
  </div>
</template>


<script>
import { testMock } from './api/mock/test';
  export default {
  methods: {
    async getData() {
       let  res =  await testMock()
       console.log(res); 
    }
  },    
  }
</script>

<style lang="scss">
#app {
}
</style>
