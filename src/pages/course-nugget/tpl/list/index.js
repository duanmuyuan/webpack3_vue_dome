import Vue from 'vue';
import bridge from 'ng-bridge';
import VueScroller from 'vue-scroller';
import _ from 'lodash';
import API from './../../api/api';

Vue.use(VueScroller);

export default Vue.extend({
  template: require('./index.html'),
  components: {
  },
  data() {
    return {
      list: [],
      dataList: [],
      utoken: '',
      minBid: '',
    };
  },
  mounted() {
    bridge.utoken((ut) => {
      this.utoken = ut;
      this.init();
    });
  },
  methods: {
    init() {
      this.getArticleList();
    },
    getArticleList(BoundaryId) {
      const params = {
        courseId: '4380',
        userToken: this.utoken,
        direction: this.minBid ? -1 : 1,
        size: 20,
        boundaryId: this.minBid,
      };
      API.articleList(params).then((res) => {
        this.dataList = res.list;
        this.minBid = res.minboundaryid;
        if (res.list && Array.isArray(res.list) && res.list.length > 0) {
          res.list.forEach((item) => {
            this.list.push(_.merge({ cid: this.cid, title: item.title, mid: item.articleid }, this.formatDate(item.publishtime)));
          });
        }
      });
    },
    formatDate(publishtime) {
      const time = new Date(publishtime.replace(/-/g, '/'));
      const year = time.getFullYear();
      let month = time.getMonth() + 1;
      if (month <= 9) {
        month = `0${month}`;
      }
      let day = time.getDate();
      if (day <= 9) {
        day = `0${day}`;
      }
      let passTime = new Date().getTime() - time.getTime();
      if (passTime < 60000) {
        passTime = `${parseInt(passTime / 1000, 10)}秒`;
      } else if (passTime < 3600000 && passTime >= 60000) {
        passTime = `${parseInt(passTime / 60000, 10)}分钟`;
      } else if (passTime < 86400000 && passTime >= 3600000) {
        passTime = `${parseInt(passTime / 3600000, 10)}小时`;
      } else if (passTime < (86400000 * 365) && passTime >= 86400000) {
        passTime = `${parseInt(passTime / 86400000, 10)}天`;
      } else {
        passTime = `${parseInt(passTime / (86400000 * 365), 10)}年`;
      }
      return {
        year,
        month,
        day,
        passTime,
      };
    },
    jumpToChaseDetail(id) {
      // eventBus.$emit(LIST_SHOW, mid);
      this.$router.push({
        name: 'index',
        query: {
          mid: id,
        },
      });
    },
    infinite(done) {
      console.log(this.list);
      setTimeout(() => {
        if (!this.dataList || !this.dataList.length) {
          done(true);
          return;
        }
        this.getArticleList();
        done();
      }, 1000);
    },
  },
});
