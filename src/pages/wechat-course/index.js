import Vue from 'vue';
import bridge from 'ng-bridge';

import './style.scss';

new Vue({
  el: '#app',
  data() {
    return {
      btnMsg: '立即购买',
      courseId: '',
      utoken: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      bridge.init();
      bridge.setTitle('订阅方式');
      bridge.initShare('', '', '', 0);
      bridge.initRefresh(1);
      this.courseId = bridge.search('courseid') || '4379';
      this.btnMsg = bridge.search('isbuy') === '1' ? '立即续费' : '立即购买';
      bridge.utoken(ut => {
        this.utoken = ut;
      });
    },
    buyClick() {
      bridge.toCoursePayment(this.courseId, '');
    },
  },
});
