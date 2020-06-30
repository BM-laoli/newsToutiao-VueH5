/**
 * 频道请求模块
 */
import http from '../plugins/http';


/**
 * 获取所有的频道数据
 * @param  {'GET'} =>{returnhttp({method
 * @param  {'/app/v1_0/channels'}} url
 */
export const getAllChannels = () => {
  return http({
    method: 'GET',
    url: '/app/v1_0/channels'
  });
};


/**
 * 批量修改用户频道列表（部分覆盖）
 * @param  {'PATCH'} {method
 * @param  {'/app/v1_0/user/channels'} url
 * @param  {{channels:[channel]}}} 必须的数组，全部都是一个数组
 */
export const addUserChannel = channel => {
  return http({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  });
};


/**
 * 删除用户指定频道
 * @param  {'DELETE'} {method
 * @param  {`/app/v1_0/user/channels/${channelId}`}} url
 */
export const deleteUserChannel = channelId => {
  return http({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  });
};
