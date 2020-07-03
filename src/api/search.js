
import http from '../plugins/http'

/**
 * 联想数据
 */
export const getSearchSuggestions = q => {
  // return http.get('/app/v1_0/suggestion',{params:{q}})
  return http({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  });
};

/**
 * 搜索结果
 */
export const getSearchResult = params => {
  return http({
    method: 'GET',
    url: '/app/v1_0/search',
    params: params
  });
};
