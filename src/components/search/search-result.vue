<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="加载失败，请稍后重试"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell 
        v-for="(item,i) in list" 
        :key="i" 
        :title="item.title" />
    </van-list>

  </div>
</template>

<script>
import { getSearchResult } from '../../api/search'
  export default {
    name:'SerachResult',
    props: {
      searchText: {
        type: String,
        requied:true
      },
    },
    data() {
      return {
        list:[],
        loading:false,
        finished:false,
        queryInfo:{
          page:1,
          perPage:20
        },
        error:false
      }
    },
    created () {
      
    },
    methods: {
      async onLoad() {
        // 异步更新数据
        // 1. 获取数据
        // 2. 添加数据到列表中
        // 3. 将loading关闭
        // 4. 判断是否还有数据 
        //   - 如果有，就更新获取下一个页码的数据
        //   - 如果没有，就加载状态，finished设置为结束
        try {
            const { data:res }  = await  getSearchResult({
              page:this.queryInfo.page,  // 页码
              per_page:this.queryInfo.perPage,  // 每页的大小
              q:this.searchText
            })

            const { results } = res.data
            this.list.push(...results)
            this.loading = false
            if( results.length )
            {
              this.page++
            }else{
              this.finshed = true
            }
        } catch (error) {
          this.error = true
          this.$toast('数据获取失败')
        }

      },
    },
  }
</script>

<style lang="scss" scoped>

</style>