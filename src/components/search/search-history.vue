<template>
  <div>
      <van-cell title="搜索历史">
        <div v-if="isDeletShow">
          <span @click="$emit('clearHistroy','')">全部删除</span>
          &nbsp;&nbsp;&nbsp;
          <span @click="isDeletShow = false">完成</span>
        </div> 
        
         <van-icon v-else name="delete"  @click="isDeletShow = true"/>
      </van-cell>

      <van-cell 
        v-for="(item,i) in histroyText" 
        :key="i" :title="item" 
        @click="SearctItemClick(item,i)"> 
        <van-icon name="close" v-show="isDeletShow" />
      </van-cell>
  </div>
</template>

<script>
  export default {
    name:'SearchHistory',
      /**
       * 注意，如果是普通的数据欸写，绝对不能更改其值，就算改好了父组件的值也还是没有变，如果是引用类型 （数组，对象）那么我们是允许的
       */
    props: {
      histroyText: {
        type: Array,
        required:true 
      },
    },
    data() {  
      return {
        // 禁止删除按钮
        isDeletShow: false
      }
    },
    methods: {
      SearctItemClick(item,i) {
        if(!this.isDeletShow){
          // 正在完成点击跳转动作
          return 
        }
          // 正在完成删除操作 
          this.histroyText.splice(i,1)
      }
    },
  }   
</script>

<style lang="scss" scoped>
</style>