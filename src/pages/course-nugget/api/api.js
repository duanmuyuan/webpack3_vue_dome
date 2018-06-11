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
  // 获取股票池三只股票
  huntBanker(arg) {
    return get('https://ngwstrategy.inquant.cn/astock/calfPickStock/huntBanker.ashx', arg);
  },
  stubNuggets(arg) {
    return get('https://ngwstrategy.inquant.cn/astock/calfPickStock/stubNuggets.ashx', arg);
  },
  // 获取文章详情页面
  articles(arg) {
    return post('https://api.niuguwang.com/Content/api/Article', arg);
  },
  articleList(arg) {
    return post('https://api.niuguwang.com/Content/api/ArticleList', arg);
  },
  // 购买判断 生成订单信息 购买后 股票池列表 研判走势历史列表 根据用户ID取购买课程
  getIsBuy(arg) {
    return post('https://api.niuguwang.com/subscribe/Denver.ashx?action=isbuy', arg);
  },
};
