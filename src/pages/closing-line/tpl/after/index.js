import Vue from 'vue';
import { Toast } from 'mint-ui';
import bridge from 'ng-bridge';
import API from './../../api/api';

export default Vue.extend({
  template: require('./index.html'),
  data() {
    return {
      hisData: [],
      moreShow: false,
      pageIdx: 1,
      hasMore: '',
    };
  },
  mounted() {
    // this.init();
    this.hisData = this.$root.hisData;
    this.moreShow = this.$root.hasMore;
  },
  methods: {
    init() {
      API.hisdata({
        page: this.pageIdx,
      }).then((res) => {
        if (res.code >= 0) {
          this.hisData = this.hisData.concat(res.hisData);
          this.moreShow = res.hasMore;
        } else {
          Toast(res.info || '数据错误');
        }
      });
    },
    className(str) {
      if (str.substr(0, 1) === '+') {
        return 'fontred';
      } else if (str.substr(0, 1) === '-') {
        return 'fontgreen';
      }
      return 'fontgray';
    },
    moreClick() {
      this.pageIdx = this.pageIdx + 1;
      this.init();
    },
    telPhone(tel) {
      bridge.telPhone(tel);
    },
  },
});
