<template>
  <div class="my-container">
    <!-- 如果你没有登录就显示这一坨 -->
    <div  class="header" v-if="!vxsUser" > 
      <div class="login-btn" @click="$router.push('/login')"> 
        <img class="moblieimg"  src="../../assets/images/mobile.png" alt="">
        <span class="text">未登录</span>
      <!-- 宫格区域 -->
      <div class="notlogin">
        <van-grid class="muner" :column-num="2" clickable>
          <van-grid-item  class="grid-item" text="文字" >
            <i slot="icon" class="toutiao toutiao-shoucang"> </i>
            <span  slot="text" class="text"> 收藏 </span> 
          </van-grid-item>
          <van-grid-item  class="grid-item" text="文字" >
          <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span  slot="text" class="text"> 历史 </span> 
          </van-grid-item>

        <div class="celle"> 
          <van-cell title="消息通知" is-link />
          <van-cell title="小智同学" is-link />
        </div>
        </van-grid> 

      </div>
      </div>
      
    </div>
    <!-- 如果你登录了 -->
    <div class="header user-info" v-else>
      <!-- 基本信息区域 -->
      <div class="base-info">
        <van-image
          fit="cover"
          round
          :src="userInfo.photo"
          class="avatrt"
        />
        <span class="nikeName">{{userInfo.name}}</span>
        <div>
          <van-button size="mini" round>  编辑资料</van-button> 
        </div>
      </div>
      <!-- 数据统计区域 -->
      <div class="data-states" >
        <div class="data-item">
          <span class="total"> {{userInfo.art_count}} </span>
          <span  class="text1"> 头条 </span>
        </div>
        <div class="data-item">
          <span class="total"> {{userInfo.fans_count}} </span>
          <span  class="text1"> 关注 </span>
        </div>
        <div class="data-item">
          <span class="total"> {{userInfo.fans_count}} </span>
          <span  class="text1"> 粉丝 </span>
        </div>
        <div class="data-item">
          <span class="total"> {{userInfo.like_count}} </span>
          <span  class="text1"> 点赞 </span>
        </div>
      </div>
      <!-- 宫格区域 -->
      <div>
        <van-grid class="muner" :column-num="2" clickable>
          <van-grid-item  class="grid-item" text="文字" >
            <i slot="icon" class="toutiao toutiao-shoucang"> </i>
            <span  slot="text" class="text"> 收藏 </span> 
          </van-grid-item>
          <van-grid-item  class="grid-item" text="文字" >
          <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span  slot="text" class="text"> 历史 </span> 
          </van-grid-item>

        <div class="celle"> 
          <van-cell title="消息通知" is-link />
          <van-cell title="小智同学" is-link />
          <van-cell class="logout-btn" title="退出登录" @click="logout" />
        </div>
        </van-grid> 

      </div>
    </div>
  </div>

</template>

<script>
import { mapState,mapMutations } from 'vuex'
import {getUserInfo,} from '../../api/user';
  export default {
  name:'Mime',
  computed: {
    ...mapState( { vxsUser:'user' } )
  },
  data() {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    // 不推荐使用直接delet会引起报错，因为我们获取不到了原来存在本地中的strog，我们应该给它设置一个null值，键还在就是值不在了
    ...mapMutations( { vxmDeleUser:'deletUser' } ),
    // ...mapMutations( { vxmInintUser:'initUer' } ),
    async logout() {
      this.$dialog.confirm({
        message: '确认退出吗？',
      })
        .then(() => {
            this.vxmDeleUser()
        })
        .catch(() => {
          // on cancel
        });
    },
    
    // 获取数据的接口
    async loadUser() {
      if( !this.vxsUser ){
        return
      }
      try {
        let { data:res} = await getUserInfo()
        this.userInfo = res.data 
      } catch (error) {
        this.$toast('获取数据失败')
      }
      
    }
  },
  }
</script>

<style lang="scss" scoped>

.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/images/banner.png') no-repeat ;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
} 
.login-btn {
  display: flex;
  justify-content: center;
  align-items: center;     
  flex-direction: column;
}
.moblieimg {
  width: 132px;
  height: 132px;
}
.text {
  font-size: 28px;
  color: #ffffff;
  margin-top: 15px;
}


.user-info {
  flex-direction: column;
  .base-info {
    width: 100%;
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box; // 放置paidng成达
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatrt {
      width: 132px;
      height: 132px;
      border: 1px solid #ffffff;
    }
    .nikeName {
      margin-left: -250px;
      font-size: 30px;
      color: #ffffff;
    }
    }
  .data-states {
    width: 100%;
    height: 130px;
    display: flex;
    .data-item {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      .total {
        font-size: 32px;
      }
      .text1{ 
        font-size: 23px;
      }
    }
  }
}

.muner{
position: absolute;
left: 0;
width: 100%;
}
.grid-item {
 height: 141px;
 i.toutiao {
  font-size: 45px;
 } 
 .toutiao-shoucang {
   color: red;
 }
.toutiao-lishi {
   color: yellowgreen;
}
 span.text {
   font-size: 28px;
  color: black;
 }
 
}
.celle {
  margin-top: 15px;
  width: 100%;
  .logout-btn {
    text-align: center;
    color: red;
  }
}
.notlogin {
  margin-top: 52px;
}
</style>