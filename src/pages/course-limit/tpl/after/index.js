import Vue from 'vue';
import { Toast } from 'mint-ui';
import bridge from 'ng-bridge';
import API from './../../api/api';

export default Vue.extend({
  template: require('./index.html'),
  data() {
    return {
      stockpool: [],
      preupdate: [],
      summarydto: [],
      linfo: [],
      hasMore: '',
      poolinfo: [],
      addtime: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      API.detail({
        usertoken: this.$root.utoken,
      }).then((res) => {
        if (res.code === 200) {
          this.stockpool = res.stockpool;
          this.preupdate = res.stockpoolpreupdate;
          this.summarydto = res.datasummarydto;
          this.linfo = res.stockpoolinfo;
          this.poolinfo = res.stockpoolinfo;
          this.addtime = this.preupdate[0].addtime;
        } else {
          Toast(res.info || '数据错误');
        }
      }, (res) => {
        Toast(res.info || '数据错误');
      });
    },
    className(sr) {
      const str = String(sr);
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
    toQuote(item) {
      bridge.toQuote(item.innercode, item.stockcode, item.stockname, item.market);
    },
    gotoHistory() {
      this.$router.push({
        name: 'history',
      });
    }
  },
});
