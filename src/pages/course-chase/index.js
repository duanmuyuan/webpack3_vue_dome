import Vue from 'vue';
import $ from 'jquery';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { Indicator } from 'mint-ui';
import bridge from 'ng-bridge';
import API from './api/api';

import WXshare from './../../plugins/hnshare';
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
      // appShow: false,
      listShow: false,
      validity: '',
      utoken: '',
      showHtml: true,
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
  components: {
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
    bridge.setTitle('猎庄追击');
    if (bridge.search('cn')) {
      this.utoken = bridge.search('usertoken') || '';
      this.init();
    } else {
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
    }
    const tile = '猎庄追击';
    const cont = '每个交易日晚8点，追踪主力、抓妖股擒牛股。';
    const url = 'https://h5.stockhn.com/course/course-chase/index.html?share=yes';
    WXshare.init($, tile, cont, url);
  },
  methods: {
    init() {
      API.getIsBuy({
        usertoken: this.utoken,
        courseid: '4379',
      }).then((res) => {
        Indicator.close();
        if (Number(res.code) === 0 && Number(res.result)) {
          this.isBuy = true;
          this.validity = res.message;
        }
        document.body.style.display = 'block';
      });
    },
  },
});
