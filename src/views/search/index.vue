<template>
  <div class="search-container">

    <form action="/" >
    <!-- 这个外面套一层外部的form还是比较重要的 ，显示原生的mobile上的搜索按钮 -->
      <van-search
        v-model="searchText"
        show-action
        background="#1989fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
      <!-- 实际上，搜索主要还是有三个部分， -->
      <!-- 搜索结果 -->
      <search-result 
        v-if="isResultShow" 
        :searchText="searchText"  />      
      <!-- /搜索结果 -->

      <!-- 联想建议 -->
      <search-list 
        class="search-list"
        v-else-if="searchText" 
        :searchText='searchText'
        @search="onSearch" />
      <!-- /联想建议 -->

      <!-- 历史记录 -->
      <search-history 
        v-else 
        :histroyText="histroyText" 
        @clearHistroy="histroyText =[]"/>
      <!-- /历史记录 -->
    </form>
    

  </div>
</template>

<script>
import SearchList from '@/components/search/search-list'
import searchHistory from '../../components/search/search-history'
import SearchResult from '@/components/search/search-result'
import { setItm,getItem,removeItem } from '../../utils/storage'
import { TOUTIAO_SERARCH_HISTORIES } from '../../constants/storage-type'
  export default {
    name:'SearchIndex',
    components: {
      SearchList,
      SearchResult,
      searchHistory,
    },
    data() {
      return {
        searchText: '',
        isResultShow:false,
        histroyText:getItem(TOUTIAO_SERARCH_HISTORIES) || []
      }
    },
    methods: {  
      // 提交触发搜索就好了
      onSearch(value) {
        // 1. 如果是点击联想就是改变值然后再传值到我们的另一个组件
        // 2. 如果是点击回车，也是改变的一种方式,
        // 我们只用了一个事件就处理了两个页面一举两得啊！
        this.searchText = value
        //发生搜索的时候就保存到历史记录中去
        this.histroyText.unshift(value)
        this.isResultShow = true
      },
      onCancel() {
        // 取消时间
        this.$router.back()
      }
    },
    watch: {
      histroyText:{
        handler:(value,oldValue) => {
          // 我们需要分状态去控制我们的业务逻辑
          setItm(TOUTIAO_SERARCH_HISTORIES,value)
        } 
      }
    },
  }
</script>

<style lang="scss" scoped>
.search-container {
    padding-top: 105px;
  .van-search__action {
  color: #ffffff;
  }
}

.van-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.search-list {
  margin-top: -90px;
}
</style>