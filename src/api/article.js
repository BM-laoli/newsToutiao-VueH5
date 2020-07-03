import http from '../plugins/http';
/**
 * 获取文章
 * @param  { 地址 } '/app/v1_1/articles'
 * @param  { 参数 } {params}
 */
export const getArticles = async params => {
  return http.get('/app/v1_1/articles',{params})
};


/**
 * 获取指定的文章
 * @param  { 地址 } `/app/v1_0/articles/${articleId}`
 * @param { 文章的具体的id } `articleId`
 */
export const getArticleById = articleId => {
  return http.get(`/app/v1_0/articles/${articleId}`)
};


/**
 * @param  { 地址 } '/app/v1_0/article/collections'
 * @param  { 要创建的文章的数据集合 } {target}
 */
export const addCollect = target => {
  return http.post('/app/v1_0/article/collections', { target})
};

/**
 * @param  { 地址 } `/app/v1_0/article/collections/${target}`
 * @param { 要删除的文章数据源 } `target`
 */
export const deleteCollect = target => {
  return http.delete(`/app/v1_0/article/collections/${target}`)
};

/**
 * @param  { 地址 } '/app/v1_0/article/likings'
 * @param  { 要更新的文章数据集合 } {target}
 */
export const addLike = target => {
  return http.post('/app/v1_0/article/likings',{ target })
};

/**
 * @param  {地址} `/app/v1_0/article/likings/${target}`
 * @param {  要删除的连接诶 } `target`
 */
export const deleteLike = target => { 
  return http.delete(`/app/v1_0/article/likings/${target}`)
};
