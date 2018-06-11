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
  // 获取地址栏参数
  getUrlParam(key) {
    let res = '';
    let ss;
    let i;
    let sss;
    let s = location.search;
    if (s) {
      s = s.substr(1);
      if (s) {
        ss = s.split('&');
        for (i = 0; i < ss.length; i += 1) {
          sss = ss[i].split('=');
          if (sss && sss[0] === key) {
            res = sss[1];
          }
        }
      }
    }
    return res;
  },
  // 判断设备是安卓还是iOS
  isIOS() {
    const u = navigator.userAgent;
    const isos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isos) return true;
    return false;
  },
  // 获取股票历史数据
  befIndex(arg) {
    return get('https://api.niuguwang.com/course/4385/catalog/index', arg);
  },
  // 获取先知
  detail(arg) {
    return get('https://api.niuguwang.com/course/4385/catalog/detail', arg);
  },
  WxShareStocks() {
    return get('https://api.niuguwang.com/course/4385/catalog/WxShareStocks');
  },
  // 历史数据
  history(arg) {
    return get('https://api.niuguwang.com/course/4385/catalog/history', arg);
  },
  // 购买判断 根据用户ID取购买课程
  getIsBuy(arg) {
    return post('https://api.niuguwang.com/subscribe/Denver.ashx', arg);
  },
  // 购买判断 根据用户ID取购买课程
  getBeforeData(arg) {
    return get('https://api.niuguwang.com/course/4385/catalog/index', arg);
  },
  // 分享次数 是否分享
  getWxShareCode(arg) {
    return get('https://user.niuguwang.com/api_wap/Activity/getWxShareCode.ashx', arg);
  },
  // 该用户是该分享码过来的
  wxShareRegister(arg) {
    return get('https://user.niuguwang.com/api_wap/Activity/wxShareRegister.ashx', arg);
  },
  // 该人分享了 告诉后台
  addWxShare(arg) {
    return get('https://user.niuguwang.com/api_wap/Activity/addWxShare.ashx', arg);
  },
  // 使用权限开启
  promotion(arg) {
    return get('https://api.niuguwang.com/course/4385/catalog/promotion', arg);
  },
  // 登录绑定  手机登录
  mobileLogin(arg) {
    return post('https://user.niuguwang.com/api_wap/ngw/mobileLogin.ashx', arg);
  },
  // 获取验证码
  getCode(arg) {
    return post('https://user.niuguwang.com/api_wap/ngw/getverifycode.ashx', arg);
  },
  registerPromotion(arg) {
    return get('https://api.niuguwang.com/course/4385/catalog/RegisterPromotion', arg);
  },
};
