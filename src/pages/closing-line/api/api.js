/**
 * 数据接口
 */
import Vue from 'vue';


const get = (url, arg) => {
  return new Promise((resolve, reject) => {
    Vue.http.get(url, {
      params: arg,
    }).then((res) => {
      resolve(res.data);
    }, reject);
  });
};
// const post = (url, arg) => {
//   return new Promise((resolve, reject) => {
//     Vue.http.post(url, arg, {
//       emulateJSON: true,
//     }).then((res) => {
//       resolve(res.data);
//     }, reject);
//   });
// };

export default {
  // 获取股票历史数据
  hisdata(arg) {
    return get('https://ngwstrategy.inquant.cn/astock/tailselect/hisdata.ashx', arg);
  },
  homedata(arg) {
    return get('https://ngwstrategy.inquant.cn/astock/tailselect/homedata.ashx', arg);
  },
};
