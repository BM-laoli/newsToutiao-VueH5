<template>
  <div class="channel-edit">
    
    <!-- 我的频道 -->
    <div>
          <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <van-button 
        class="channel-btn"
          type='danger' 
          plain size="mini" 
          @click="onDeleteShowChannel"
          round> {{ isEditr ? '完成' : '编辑' }} </van-button>
      </van-cell>
      <!-- 注意cell下方有内容的时候就会有下边距 -->
      <div>
        <van-grid 
        class="my-graid"
        :gutter="10">
          <van-grid-item 
            class="grid-item"
            v-for="(item,i) in channels" :key="i"
            @click="onChannelToggle(item,i)" 
            > 
            <van-icon
              v-show="isEditr && !fiexChanner.includes( item.id )"
              slot="icon" name="clear">
            </van-icon>
            <span 
              slot="text" 
              class="text" 
              :style="{ color:i === active ? 'red' :'' }"  
            > {{item.name}} </span>
            </van-grid-item>
        </van-grid>
      </div>  
    </div>
    <!-- /我的频道 -->
    <!-- 频道推荐 -->
    <div>
          <van-cell :border="false">
        <div slot="title" class="title-text">推荐频道</div>  
      </van-cell>
      <!-- 注意cell下方有内容的时候就会有下边距 -->
      <div>
        <van-grid class="recommon-grid"  :gutter="10">
          <van-grid-item
            class="grid-item"
            v-for="(item,i) in recommetChannles" :key="i" 
            icon="plus"
            @click="onAddChannel(item)" 
            :text="item.name" />
        </van-grid>
      </div>
    </div>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel} from '../../api/channel'
import { setItm } from '../../utils/storage'
import {mapState} from 'vuex';
  export default {
    name:'ChannelEdit',
    props: {
      channels: {
        type: Array,
        default: () => new Array()
      },
      active:{ 
        type:Number,
      },
    },
    data() {
      return {
        channelsAll: [],
        isEditr:false,
        fiexChanner:[0]  // 固定频道不允许被删除的id,数组带来的灵活性还有可控性是非从的好的
      }
    },
    created () {
      this.onloadChnnelsAll();
    },
      // 注意这里我们要筛选一遍，筛选不属于 我的频道的 频道
    computed: {
      ...mapState( {vxsUser:'user'} ),   
      recommetChannles() {
        // 一般的逻辑思维代码
          // const channel = []
          // this.channelsAll.forEach(element => {
          //     const result = this.channels.find( v => { return v.id === element.id } )
          //     if( !result )  { 
          //       channel.push( element )
          //      }
          // });
          // return channel
        // NB的代码逻辑
        // ========> 我是一个华丽的分割线
        return this.channelsAll.filter( v => {
          return !this.channels.find( pre => {
            return pre.id === v.id
          } )
        } )
      }
    },
    methods: {
      // 封装出去
      async deleteChannelOfSelect(value){
        if(!this.vxsUser ){
          setItm( 'TTOUTIAO_CHANNELS',this.channels )  // 什么是修改，在本地存储中就是简单的覆盖就好了
        } else {  
          try {
            await  deleteUserChannel(value.id)
          } catch (error) {
            this.$toast('删除失败，请重试')
          }
        }
      },
      // 点击的试试实编辑还有切换
      async onChannelToggle (value,index) {
        // 由于我们这里需要在同一个事件里处理两个事件，所以我们需要做一定的逻辑判断
        if( !this.isEditr ) { 
          // 点击切换的功能代码,如何切换就去看我们的首页的里面的那个active就好了
            this.$emit('update:active',index)
            this.$emit('input',false)  // 高阶组件的封装,子组件直接去触发父组件的值的绑定，双向数据的搬定
        } else {  
          // this.$emit('update:active',index)
          // 注意啊，这里是有一个坑，在这儿，如果你的数据变化了，那么我们这ative激活状态就会有问题了！
          if( index <= this.active ) { 
            this.$emit( 'update:active', this.active - 1)
          }
          // 移除也是非常的简单的
          this.channels.splice(index,1)  // 重新计算还是非常的简单的！
        
          // 实现数据的本地持久化,我们在这里就不往里面堆砌了
          this.deleteChannelOfSelect(value)
        }
      },
      // 所点击的时候完成数据交互
      async onDeleteShowChannel(value){
          this.isEditr = ! this.isEditr

      },
      async onAddChannel( value ) {
        // 由于我们使用了计算属性，因此我们的数据发生变化的时候，我们不需要自己手动去操作下方数据的变化，如果我们的上面的数据变化了
        // 那么我的计算属性会去自动的计算我们的数据，因此我们直接就能实现这个页面交互的效果 
        this.channels.push(value)
        
        // ==========> 我是一个华丽的分割线
        // 开始进行数据的同步持久化，如果有登陆就写在用户上，如果没有登录就写在本地存储中
        if(this.vxsUser) {
          try {
            await addUserChannel( {  
              id:value.id,  // 添加的id
              seq:this.channels.length, // 序号
            } )
          } catch (error) {
            console.log(error);
            this.$toast('保存失败，请重试')
          }
        } else {
          setItm( 'TTOUTIAO_CHANNELS',this.channels )  // 直接操作本地存储就好了
        }
      },
      // 加载所有的默认的频道
      async onloadChnnelsAll() {
        try {
          let { data:res} = await getAllChannels()

          this.channelsAll = res.data.channels
        } catch (error) {
          return console.log(error);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.channel-edit {
  padding: 85px 0;
}
.title-text {
  font-size: 32px;
  color: #333; 
}
.channel-btn {
  width: 104px;
  font-size: 26px;
  height:48px;
  color: #f85959;
}
// 作用域样式和 作用根接节点，非根节点就会出问题，我们需要使用样式穿透
::v-deep.grid-item {
  width: 160px;
  height: 86px; 
  .van-grid-item__content  { 
    white-space: nowrap; // 不换行
    // overflow: hidden;  不要换行，换行的话就凉凉了! 我们的×号就会被显示截掉
    background-color: #f4f5f6;
    .van-grid-item__text, .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    // 自定义图标指令
    .van-grid-item__icon-wrapper  { 
      position: unset;
     } 
   }
}

// 删除图标的样式配置规则
::v-deep.my-graid {
   .grid-item {
      .van-icon-clear {
        // 注意，在调试工具中写的的单位都是未经过编译的，所以写的时候要写倍数
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 3;
        font-size: 40px;
        color: #cacacc;
      }
   }
 } 


// 加号图标的排布规则
::v-deep.recommon-grid {
  .grid-item { 
    .van-grid-item__content { 
      flex-direction: row;
      // height: 24px;
      .van-icon { 
        font-size: 28px;
       }
       .van-grid-item__text {
         margin-top: 0;
         margin-right: 6px;
       }
     }
   }
}

</style>