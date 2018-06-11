import Vue from 'vue';
import bridge from 'ng-bridge';
import { Swipe, SwipeItem } from 'mint-ui';

import 'mint-ui/lib/style.css';
import down from '../../../../plugins/downcom';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default Vue.extend({
  template: require('./index.html'),
  data() {
    return {
      showBtn: false,
    };
  },
  mounted() {
    if (bridge.search('cn')) {
      this.showBtn = false;
    } else {
      this.showBtn = true;
    }
  },
  methods: {
    buyClick() {
      if (bridge.search('share')) {
        down.download();
      } else {
        bridge.toCoursePayment('4379', '');
      }
    },
    telPhone(tel) {
      bridge.telPhone(tel);
    },
    bindClick() {
      location.href = 'https://h5.niuguwang.com/course/wechat-course/index.html?isbuy=0&4379';
    },
  },
});
