<template>
  <div class="search-container">
    <van-cell 
      v-for=" ( item,i ) in suggestions"  
      :key="i"  icon="search"
      @click="$emit('search',item)">
      <div slot="title"  v-html="higthLigth(item)" >   </div>
      </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'  // 注意优化，按需加载
import { getSearchSuggestions } from'../../api/search'
  export default {
    name:'SearchList',
    props: {
      searchText: {
        type: String,
        requied:true
      },
    },
    data() {
      return {
        suggestions: []
      }
    },
    watch: {
      // 注意这里的联系进行节流，完美的写法
      searchText:{
          // 不要写箭头函数，要不然里面的this，就有翁提了
          // console.log(value);  // 注意这个是变化之后的最新数据，第一次是米有的第一次这个组件是没有渲染出来的
         handler:debounce( function (value) {
          this.loadSerchList(value)
        },600),
        immediate:true
        // 我们需要这个一上来就触发 不管你是不是触发了这个
      } 
    },
    computed: {
    },
    methods: {
      async loadSerchList(value) {
        try {
        let { data:res } = await getSearchSuggestions( value )
        this.suggestions = res.data.options
        } catch (error) {
          this.$toast('数据获取失败稍后重试')
        }
      },
      higthLigth(value){
        let hightlightStr = `<span class="active">${this.searchText}</span>`
        const reg = new RegExp( this.searchText,'gi' )  // 注意这里的正则要如何动态的创建呢？就是用这个方法就ok了
        return  value.replace(reg,hightlightStr) 
      },
    },
  }
</script>

<style lang="scss" scoped>
.search-container {
 ::v-deep.active {
    color: red;
  }
}

</style>