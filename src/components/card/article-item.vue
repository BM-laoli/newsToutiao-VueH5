<template>
  <div class="article-item">
    <van-cell-group>
      <van-cell >
          <!-- 自定义插槽  -->
          <div slot="title" class="titile van-multi-ellipsis--l2"  >
            {{article.title}}
          </div>
          
          <div slot="label">
            <div class="cover_warp" v-if="article.cover.type === 3">
              <div class="cover-item"
                v-for="( item,i ) in article.cover.images"
                :key="i"
              >   
                <van-image
                class="cover-item-image"                 
                fit="cover"
                :src="item"/> </div>
            </div>
            <div class="label-info-warp">
              <span> {{article.aut_name}} </span>
              <span> {{article.comm_count}} </span>
              <span> {{article.pubdate | relativeTime }} </span>
            </div>
          </div>
          <!-- 条件渲染 -->
          <div slot="default"  v-if="article.cover.type === 1"  > 
            <van-image 
              fit="cover"
              class="right_cover" 
              :src=" article.cover.images[0] "/>
          </div>
      </van-cell> 
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object,
        required:true
      },
    },
  }
</script>

<style lang="scss" scoped>
.article-item { 
  .titile { 
    font-size: 32px;
    color:black;
   }
  
  //  注意标题的模块的大小，我们可以通过flex来设置
  .van-cell__value {
    flex: unset;
    padding-left: 25px;
    width: 232px;
    height: 146px;
    .right_cover { 
      width: 232px;
      height: 146px;
     }  
  }
  .label-info-warp {
    font-size: 22px;
    margin-right: 25px;
    color:red;
   }

   .cover_warp {
      display: flex; 
      padding: 30px 0;
      .cover-item { 
        flex: 1;
        height: 146px;
        .cover-item-image {
          width: 100%;
          height: 146px;
        }
        // 注意一下这个选择器就非常的蛇皮了，调整图片之间的间隙
        &:not(:last-child) {
          padding-right: 4px;
        }
      }
  }
 }

</style>