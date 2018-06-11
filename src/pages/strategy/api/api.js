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
const post = (url, arg) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(url, arg, {
      emulateJSON: true,
    }).then((res) => {
      resolve(res.data);
    }, reject);
  });
};

export default {
  getUserStatus(args) {
    return get('', args);
  },
  getCoupons(args) {
    return post('', args);
  },
  catalog(arg) {
    return get('https://api.niuguwang.com/course/4373/catalog/index', arg);
  },
  weixinShare(arg) {
    return post('https://luck.niuguwang.com/weixin/weixinshare.ashx', arg);
  },
};

