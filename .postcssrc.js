// 基于node运行
module.exports = {
  plugins: {
    // 第一个插件
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    // 第二个插件
    'postcss-pxtorem': {
      rootValue ({file}) {
        console.log(file);
        console.log( (file.indexOf('vant') !== -1 ? 37.5 : 75) ); 
          return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
    },
  },
}