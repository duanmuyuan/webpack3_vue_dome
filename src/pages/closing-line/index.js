import Vue from 'vue';
import $ from 'jquery';
import VueResource from 'vue-resource';
import { Indicator, Toast } from 'mint-ui';
import bridge from 'ng-bridge';
import API from './api/api';
import WXshare from './../../plugins/hnshare';
import down from './../../plugins/downcom';

import AfterView from './tpl/after/index';
import BeforeView from './tpl/before/index';

import './style.scss';

Vue.use(VueResource);

new Vue({
  el: '#app',
  components: {
    BeforeView,
    AfterView,
  },
  data() {
    return {
      isBuy: false,
      utoken: '',
      hisData: [],
      newData: [],
      sectShow: false,
      showHtml: true,
      hasMore: '',
      endTime: '',
      priceData: [],
      share: false,
      showBtn: false,
    };
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
    bridge.setTitle('尾盘三只股');
    bridge.initShare('', '', '', 0);
    bridge.utoken((ut) => {
      this.utoken = ut;
      this.showHtml = false;
      this.init();
    });
    if (bridge.search('share')) {
      // const opts = {
      //   til: '尾盘三只股', // 分享标题
      //   cont: '尾盘发出信号买入 早盘冲高卖出赚钱', // 分享简介摘要
      //   lik: 'https://h5.stockhn.com/course/closing-line/index.html?share=yes', // 分享地址链接
      //   imgsrc: '', // 分享图标
      //   flag: false, // 分享域名地址（true niuguwang  || false stockhn）
      // };
      const tile = '尾盘三只股';
      const cont = '尾盘发出信号买入 早盘冲高卖出赚钱';
      const url = 'https://h5.stockhn.com/course/closing-line/index.html?share=yes';
      // WXshare.init(opts);
      WXshare.init($, tile, cont, url);
    }
    setTimeout(() => {
      if (this.showHtml) {
        this.init();
      }
    }, 500);
    if (!bridge.search('cn')) this.showBtn = true;
  },
  methods: {
    init() {
      API.homedata({
        usertoken: this.utoken,
      }).then((res) => {
        Indicator.close();
        // document.body.style.display = 'block';
        if (res.code >= 0) {
          this.isBuy = res.isSubScribe;
          this.hisData = res.hisData;
          this.newData = res.data;
          this.hasMore = res.hasMore;
          this.endTime = res.endTime;
          this.priceData = res.priceData.reverse();
        } else {
          Toast(res.info || '数据错误');
        }
      });
    },
    buyClick() {
      if (bridge.search('share')) {
        down.download();
      } else {
        this.sectShow = false;
        bridge.toCoursePayment('4383', '');
      }
    },
    sectClick() {
      this.sectShow = !this.sectShow;
    },
  },
});
