import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { Indicator, Toast } from 'mint-ui';
import bridge from 'ng-bridge';
import API from './api/api';

import createRoute from './api/routes';

import './style.scss';

const router = createRoute();

Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  data() {
    return {
      isBuy: false,
      showHtml: true,
      utoken: '',
      validity: '',
      transitionName: 'slide',
    };
  },
  watch: {
    // 监视路由，参数为要目标路由和当前页面的路由
    $route(to, from) {
      const toDepth = to.path.substring(0, to.path.length - 2).split('/').length;
      const fromDepth = from.path.substring(0, from.path.length - 2).split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide';
    },
  },
  beforeCreate() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle',
    });
  },
  mounted() {
    bridge.init();
    bridge.initRefresh(1);
    bridge.setTitle('涨停先知');
    bridge.initShare('', '', '', 0);
    bridge.utoken((ut) => {
      this.utoken = ut;
      this.showHtml = false;
      this.init();
    });
    setTimeout(() => {
      if (this.showHtml) {
        this.init();
      }
    }, 1500);
  },
  methods: {
    init() {
      API.getIsBuy({
        usertoken: this.utoken,
        action: 'isbuy',
        courseid: '4385',
        date: new Date(),
      }).then((res) => {
        Indicator.close();
        if (Number(res.code) === 0 && Number(res.result)) {
          this.isBuy = true;
          this.validity = res.message;
        }
      }, (res) => {
        Toast('数据错误' || res.message);
      });
    },
    // buyClick() {
    //   this.sectShow = false;
    //   bridge.toCoursePayment('4385', '');
    // },
    // sectClick() {
    //   this.sectShow = !this.sectShow;
    // },
  },
});
