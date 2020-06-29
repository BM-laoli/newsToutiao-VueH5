<template>
  <div class="login-container">
  <van-nav-bar title="登录"  class="page-nav-bar"> 
     <template #left>
       <!-- 行为很的简单后退一下就好好了,从哪儿来回哪儿去 -->
      <van-icon name="cross" @click="$router.back()" />
    </template>
  </van-nav-bar>
  <!-- 表单 -->
    <van-form  @submit="onSubmit" ref="loginRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>  
      </van-field>
        <van-field
          v-model="user.code"
          name="code"
          type="number"
          maxlength="6"
          placeholder="请输入验证码"
          :rules="userFormRules.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>  
        <template #button>
          <!-- 控制显示隐藏 -->
          <van-count-down :time="1000 * 60" format="ss s" 
          v-if="isShowCountDowm"
          @finish="isShowCountDowm = false"
          />
            <van-button
              v-else 
              class="send-sms-btn" 
              round  size="small" 
              type="default"
              native-type="button"
              @click="onSendCode">发送验证码</van-button>
          </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button  class="login-btn" block type="info" nati ve-type="submit">
          登录
        </van-button>
      </div>
  </van-form>
  </div>
</template>

<script>
import {login,sendSms} from '../../api/user'
import { mapMutations } from 'vuex'
  export default {
    name:'Login',
    data() {
      return {
        user: {
          mobile: '13911111111', // 手机号
          code: '246810' // 验证码
        },
        userFormRules:{
          // 注意这个校验规则是自上而下的，如果前面验证通过，就会去走下面的验证
          // 而且这个组件很强大，如果验证不通过在组件的内部根本就不会触发 submit事件
          mobile:[
            { require:true, 
              message: '手机号不能为空',
            },
            { pattern:/^1[3|5|7|8]\d{9}$/,
              message:'手机号格式有误' }
          ],
          code:[
            { require:true, 
              message: '请输入验证码' },
            { pattern:/^\d{6}$/,
              message:'验证码格式有误' }
          ],
        },
        isShowCountDowm:false
      }
    },
    methods: {
      ...mapMutations( { vxmInintUser:'initUer' } ),
      async onSubmit() {
        // 获取数据完成验证
        // 还请求 保存token登录
        let user = this.user
          
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,  // 禁止背景点击
          duration:0,  // 默认是2s,如果是0就是一直展示,注意,任何一个
          // toast后续调用,都会覆盖之前的toast，于是这个登录成功就停了
        });

        try {
          const {data:res} = await login( user ) 
          this.$toast.success('登录成功')
          // 处理
          this.vxmInintUser(res.data)
          // 回退
          this.$router.back()
        } catch (error) {
          if (error.response.status === 400) {
            this.$toast.fail('手机号或者用户名错误');
          } else {
            this.$toast.fail('登录失败,请重试');
          }
        }
      },
      async onSendCode() {
        // 倒计时，禁用 ，发请求
        // 先验证手机号,手机号验证通过采取发请求
        try {
          await this.$refs.loginRef.validate('mobile')
        } catch (err) {
          return this.$toast.fail( '手机验证失败' )
        }   
      // 倒计时
        this.isShowCountDowm = true
      // 发请求就好了
        try {
          await sendSms( this.user.mobile )
        } catch (error) {
          // 如果有错误了就关闭当前的倒计时
          this.isShowCountDowm = false
          if(error.response.status === 429){
            this.$toast('发送太频繁了，请稍后重试')
          } else {
            this.$toast('发送失败，请稍后重试')
          }    
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  background-color: #ededed;
  width: 152px;
  height: 46px;
  line-height: 46px;
  span {
    font-size: 22px;
    color:#666;
  }
}
.login-btn-wrap {
  margin:  53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;  
  }
}
</style>