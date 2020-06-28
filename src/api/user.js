import http from '../plugins/http'

/**
 * 登录接口
 * @param {参数对象} options 
 */
export const login = options  => {
  return http.post('/app/v1_0/authorizations',options)
}


/**
 * 发送验证码
 * @param {参数对象} options 
 */
 export const sendSms = options=> {
  return http.get(`/app/v1_0/sms/codes/${options}`)
};

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  });
};

/**
 * 关注用户
 */
export const addFollow = target => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  });
};

/**
 * 取消关注用户
 */
export const deleteFollow = target => {
  return request({
    url: `/app/v1_0/user/followings/${target}`,
    method: 'DELETE'
  });
};

/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  });
};

/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  });
};

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  });
};
