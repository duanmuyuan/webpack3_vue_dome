import Vue from 'vue';
import $ from 'jquery';
import VueResource from 'vue-resource';
import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';
import API from './api/api';
import wxShare from './../../plugins/ngshare';

import LoginView from './tpl/wx-share/login.vue';
import LimitView from './tpl/wx-share/limit.vue';

import './wx-share.scss';

Vue.use(VueResource);
Vue.component(Toast.name, Toast);
// Vue.component(Indicator.name, Indicator);
// Vue.component(Field.name, Field);

new Vue({
  el: '#app',
  data() {
    return {
      telphone: '',
      captcha: '',
      isLogin: false,
      remainingTime: '',
    };
  },
  components: {
    LoginView,
    LimitView,
  },
  mounted() {
    // sessionStorage.setItem('utoken', '0pZt6norfcw90ls3SarbdrJr2rd3ZVX-s-rr2jqLb4gGAD809iRTng**');
    this.init();
    const tile = '快来和我一起抓涨停';
    const cont = '助力成功您与好友均将获得抓涨停打板神器，盈利近在咫尺。';
    const url = `${location.origin}${location.pathname}?code=${API.getUrlParam('code')}`;
    wxShare.init($, tile, cont, url);
  },
  methods: {
    init() {
      API.getIsBuy({
        usertoken: sessionStorage.getItem('utoken'),
        action: 'isbuy',
        courseid: '4385',
        date: new Date(),
      }).then((res) => {
        document.body.style.display = 'block';
        // Indicator.close();
        if (Number(res.code) === 0 && Number(res.result)) {
          this.isLogin = true;
          this.remainingTime = res.validTime;
        }
      }, (res) => {
        Toast('数据错误' || res.message);
      });
    },
  },
});

