import 'babel-polyfill';
import Vue from 'vue';
import $ from 'jquery';
import bridge from 'ng-bridge';
import NGW from './lib/download.js';
import WXshare from '../../plugins/wxshare.js';
import './index.scss';

new Vue({
  el: '#app',
  data() {
    return {
      isApp: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    toBuy() {
      if (this.isApp) {
        bridge.utoken(utoken => {
          if (utoken) {
            bridge.toCoursePayment('4357', '');
          } else {
            bridge.login();
          }
        });
      } else {
        if (NGW.qvendor.android) {
          location.href = 'niuguwang.scheme://';
        }
        if (NGW.qvendor.ios) {
          location.href = 'ngwre://';
        }
        setTimeout(() => {
          NGW.download();
        }, 500);
      }
    },
    init() {
      const page = {
        pagetite: 'DK短线宝+',
        sharetitle: 'DK短线宝+',
        shareContent: 'TOP15日日达，精准把握个股买卖点。',
        shareUrl: 'https://h5.niuguwang.com/huodong/coursepage/dk/index.html?share=1',
      };
      bridge.init();
      bridge.initRefresh(1);
      bridge.setTitle(page.pagetite);
      bridge.initShare(page.sharetitle, page.shareContent, page.shareUrl, 1);
      WXshare.init($, page.sharetitle, page.shareContent, page.shareUrl);
      if (bridge.search('share')) {
        this.isApp = false;
      }
    },
    telPhone(tel) {
      bridge.telPhone(tel);
    },
  }
});
