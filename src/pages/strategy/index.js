import Vue from 'vue';
import VueResource from 'vue-resource';
import bridge from 'ng-bridge';
import api from './api/api';

import './style.scss';


Vue.use(VueResource);
new Vue({
  el: '#app',
  data() {
    return {
      username: '',
      cellData: [],
      prices: [],
      courseinfo: [],
      imgUrl: [
        { src: require('./images/icon@2x.png') },
        { src: require('./images/icon_2@2x.png') },
        { src: require('./images/icon_3@2x.png') },
      ],
    };
  },
  mounted() {
    this.init();
    bridge.init();
    bridge.isStrategyRankCourse();
    bridge.setTitle('策略金榜');
  },
  methods: {
    init() {
      api.catalog().then((res) => {
        this.username = res.data[0].username;
        this.cellData = res.data;
        this.prices = res.prices[0];
        this.courseinfo = res.courseinfo;
        document.body.style.display = 'block';
      });
    },
    idxCont(idx) {
      if (idx < 3) return `<img src="${this.imgUrl[idx].src}" alt="">`;
      return `<span>NO.${idx + 1}</span>`;
    },
    promotion() {
      if (this.prices.promotionprice) return String(this.prices.promotionprice).replace('元', '');
      return String(this.prices.originalprice).replace('元', '');
    },
    toCoursePayment() {
      bridge.toCoursePayment(this.courseinfo.courseid, '');
    },
    goGenius(item) {
      bridge.goGenius(item.userid, item.username);
    },
  },
});
