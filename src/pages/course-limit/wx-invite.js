import Vue from 'vue';
import VueResource from 'vue-resource';
import {
  // Indicator,
  Toast,
  Popup,
} from 'mint-ui';

import 'mint-ui/lib/style.css';
import bridge from 'ng-bridge';
import API from './api/api';

import './wx-invite.scss';

Vue.use(VueResource);
Vue.component(Popup.name, Popup);
Vue.component(Toast.name, Toast);
// Vue.component(Indicator.name, Indicator);

new Vue({
  el: '#app',
  data() {
    return {
      isShare: false,
      wxCode: '',
      timeSpan: '23时59分59',
      shareCount: 0,
      popupVisible: false,
      timeNum: 0,
      isBuy: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      bridge.init();
      bridge.setTitle('邀好友 赢牛股');
      bridge.initRefresh(1);
      bridge.utoken((ut) => {
        this.utoken = ut;
        this.getWxShareCode();
      });
      if (!this.utoken) {
        setTimeout(() => {
          this.getWxShareCode();
        }, 200);
      }
    },
    // getIsBuy() {
    //   API.getIsBuy({
    //     usertoken: this.utoken,
    //     action: 'isbuy',
    //     courseid: '4385',
    //     date: new Date(),
    //   }).then((res) => {
    //     if (Number(res.code) === 0 && Number(res.result)) {
    //       this.isBuy = true;
    //     }
    //   }, (res) => {
    //     Toast('数据错误' || res.message);
    //   });
    // },
    getWxShareCode() {
      API.getWxShareCode({
        usertoken: this.utoken,
      }).then((res) => {
        document.body.style.display = 'block';
        if (Number(res.code) === 0 && Number(res.result)) {
          this.shareCount = res.wxShareInfo.shareCount;
          this.wxCode = res.wxShareInfo.code;
          this.isShare = res.wxShareInfo.isShare;
          this.timeNum = res.wxShareInfo.timeSpan;
          this.timeSpan = this.timeStamp(res.wxShareInfo.timeSpan);
          this.timeDown();
          // this.getIsBuy();
        }
      }, (res) => {
        Toast('数据错误' || res.message);
      });
    },
    timeDown() {
      if (this.timeNum) {
        setInterval(() => {
          this.timeSpan = this.timeStamp(this.timeNum -= 1);
        }, 1000);
      }
    },
    timeStamp(times) {
      let time = `${parseInt(times, 0)}秒`;
      if (parseInt(times, 0) > 60) {
        const second = parseInt(times, 0) % 60;
        let min = parseInt(times / 60, 0);
        time = `${min}分${second}秒`;
        if (min > 60) {
          min = parseInt(times / 60, 0) % 60;
          const hour = parseInt(parseInt(times / 60, 0) / 60, 0);
          time = `${this.addZero(hour)}时${this.addZero(min)}分${this.addZero(second)}秒`;
        }
      }
      return time;
    },
    addZero(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    },
    goToShare() {
      if (this.utoken) {
        this.popupVisible = true;
      } else {
        bridge.login();
      }
    },
    immediateUse() {
      API.promotion({
        usertoken: this.utoken,
      }).then((res) => {
        location.href = `${location.origin}/course/course-limit/index.html`;
      });
    },
    addWxShare() {
      API.addWxShare({
        usertoken: this.utoken,
      });
    },
    goToCourse() {
      API.promotion({
        usertoken: this.utoken,
      }).then((res) => {
        location.href = `${location.origin}/course/course-limit/index.html`;
      });
    },
    goToWxShare(ng) {
      this.addWxShare();
      bridge.share('快来和我一起抓涨停', '助力成功您与好友均将获得抓涨停打板神器，盈利近在咫尺。', `${location.origin}/course/course-limit/wx-share.html?code=${this.wxCode}`, ng);
      if (API.isIOS()) {
        window.location.reload();
      }
    },
  },
});

