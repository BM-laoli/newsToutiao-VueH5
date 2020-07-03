<template>
  <div class="article-list">

    <van-pull-refresh   
      v-model="isRefreshing" 
      @refresh="onRefresh" 
      :success-duration = "1500"
      :success-text="successText">

          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
          >
            <article-item v-for="(item,i) in list" :key="i" 
            :article = "item"
            >   </article-item>
            <!-- <van-cell v-for="(item,i) in list" :key="i" :title="item.title" /> -->
          
          </van-list> 

    </van-pull-refresh>

  </div>
</template>


<script>
import { getArticles } from '../../api/article'
import ArticleItem from '../../components/article/article-item'
export default {
    name:'ArticleList',
    components: {
      ArticleItem,
    },
    props: {
      channel: {
        type: Object,
        require:true
      },
    },
    data() {
      return {
        successText:'',
        isRefreshing:true,  // 控制下拉刷新按钮
        error:false,
        list: [],
        loading: false,
        finished: false,
        timestamp:null,  // 时间戳用于分页
      }
    },
    methods: {
    async onRefresh() {
      try {
        // 下来属性，追加到列表的顶部，关闭loainh
        let {data:res } = await getArticles( {
           channel_id:this.channel. id,
           timestamp:Date.now(),  // 这个就是传最新数据就是最新数据
           with_top:1
        } )
        // 重新把最新的加载进去
         this.list.unshift( ...res.data.results )
         this.successText = `更新了${res.data.results.length}条数据`
         this.isRefreshing = false  
      } catch (error) {
        
        return this.successText = '刷新失败请重试'
        this.isRefreshing = '刷新失败'
      }
    },
     async onLoad() {
       try {
         let { data:res } = await getArticles( { 
           channel_id:this.channel. id,
          //  timestamp, 简单理解就是一个页面，时间戳,第二个时间错，会发给你后一页的时间搓
           timestamp:this.timestamp || Date.now(),
           with_top:1//,是否包含置顶文章
          } )

        this.list.push( ...res.data.results )  // 展开运算

        this.loading = false

        if( res.data.results.length )  {
          // 获取数据
            this.timestamp = res.data.pre_timestamp
        } else {
          //  没有数据了
          this.finished = true
          // 如果有报错就这样来处理
          this.error = true
        }

       } catch (error) {
         
       }
      
      },
    },
  }
</script>

<style scoped>
.article-list {
  height: 79vh;
  /* 百分比是相对于父元素的 body找到就好了*/
  overflow: auto;
}
</style>