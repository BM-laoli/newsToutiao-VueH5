<template>
  <div class="home-container">
    <!-- 导航栏部分 -->
    <van-nav-bar  class="page-nav-bar" fixed  >
      <van-button 
      class="search-butn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏部分 -->

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable>
      <van-tab   v-for="(item) in channels" :key="item.id" 
        :title="item.name" > 
        
        <article-list :channel="item"></article-list>
        </van-tab>  
      <!-- 这个是一个占位符号，为了解决最后的东西显示不出来，宽度设置成后面的那个盒子大小就好 了 -->
      <div slot="nav-right" class="plachhoede">
          
      </div>
      <div slot="nav-right" class="humberg-btn" @click="show = true">
        <i class=" toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道弹出层 -->
    <div>
      <van-popup
        v-model="show"
        closeable
        position="bottom" 
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
      <channel-edit 
        v-model="show"
        :active.sync="active" 
        :channels="channels"
        > </channel-edit>
      </van-popup>
    </div>
    <!-- /频道弹出层 -->

  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from '../../components/article/article-list'
import ChannelEdit from '../../components/channel/channel-edit'
import  {mapState} from 'vuex'
import { getItem} from '../../utils/storage'
  export default {
    name:"home",
    components: {
      ArticleList,
      ChannelEdit
  },
    data() {
      return {
         active: 0,
         channels:[],
         show:false
      }
    },
    computed: {
      ...mapState({vxsUser:'user'})
    },
    methods: {
      async loadUserChannels() {
        // // 获取用户的列表
        // let { data:res } = await getUserChannels() 
        // this.channels = res.data.channels
        // ============> 分割线
        let thatChannle = []
        if( !this.vxsUser ){
          const localchannel = getItem('TTOUTIAO_CHANNELS')
          if(!localchannel){
            let { data:res } =  await  getUserChannels()
            thatChannle = res.data.channels
            return 
          }
          thatChannle = localchannel
        } else {
          let { data:res } =  await  getUserChannels()
          thatChannle = res.data.channels
        }
        // 编码风格
        this.channels = thatChannle
        
      }
    },
    created () {
      this.loadUserChannels()
    }
  }
</script>

<style lang="scss" scoped>
.home-container { 
  padding-top: 174px;
  // 顶部滚动的时候出现的问题全部顶上去了就需要用到这个手动的给他设置一个位置
  padding-bottom: 100px;  
 ::v-deep.van-nav-bar__title {
    max-width: unset;
  }
  .search-butn {
    width: 555px;
    height: 64px;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
 
}
::v-deep.channel-tabs {
  .van-tabs__wrap {
    // 滚动的时候一个位置的问题
    height: 82px ; // 我们细心的观察到我们这个东西 是要给父元素加的  
    position: fixed;
    flex: 92px;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
  } 
 .van-tab {
//  注意 组件样式的采用了flex布局,我们超过4个之后才是会继续操作一些东西，如果是需要构建自己的项目，我们需要使min-width来实现
   min-width: 200px;
   height: 82px;
   font-size: 30px;
   color: #777;
   border-right: 1px solid #edeff3; 
  }
  // 选中的时候的状态
  .van-tab--active {
    color: #3333;
  }
  // 注意我吗调节样式要非常的细心,由于设置line buttom的时候不生效，观察到父级元素有样式，我们需要清一些
  .van-tabs__nav {
    // padding-bottom: 0;
  }

  .van-tabs__line {
    width: 31px!important;
    height: 6px;
    background-color: #3692fa;
    bottom: 40px;
  }

  .plachhoede {
    // 注意啊，这个时候你可能设置不上去，因为这个属于felx的子项目如果你要设置高度是设置不上去的 因为所有的空间都已经比占据完了
    // 于是我们要指定flex-shirink 0 指定它不参与计算
    flex-shrink: 0;
    width: 10px;
    height: 82px;
  }
  .humberg-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    i.toutiao {
      font-size: 33px;
    }
    // 如何实现渐变色？我们直接使用背景图片来做
    &::before {
      content: '';
      position: absolute;
      left: 0;
      // 效果手机有得，但是手机上是有的
      width: 1px;
      height: 100%;
      background: url('../../assets/images/gradient-gray-line.png');
      background-size: contain;
    }
  }
}



</style>