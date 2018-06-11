import Vue from 'vue';
import bridge from 'ng-bridge';
import showDown from 'showDown';
import API from '../../api/api';
import down from '../../../../plugins/downcom';

const showDownCont = new showDown.Converter();

export default Vue.extend({
  template: require('./index.html'),
  data() {
    return {
      stockList: [],
      riskTip: '',
      summaryTip: '',
      articleData: [],
      imgUrl: [
        require('../../images/pduo.png'),
        require('../../images/zx.png'),
        require('../../images/pduo.png'),
      ],
      stockPool: '股票池',
      showBtn: false,
      fiveResult: false,
    };
  },
  mounted() {
    this.stockPool = '短线股票池';
    this.initAfter();
    if (bridge.search('cn')) {
      this.showBtn = false;
    } else {
      this.showBtn = true;
    }
  },
  methods: {
    initAfter() {
      API.articles({
        id: this.$route.query.mid || '',
        courseId: '4380',
        userToken: this.$root.utoken,
      }).then((res) => {
        console.log(res);
        const content = JSON.parse(res.data.content).content;
        console.log(content);
        res.data.content = showDownCont.makeHtml(content);
        console.log(res.data.content);
        this.articleData = res.data;
        this.stubNuggets(res.data.publishtime);
      });
    },
    stubNuggets(tm) {
      API.stubNuggets({
        time: this.timeformat(tm),
        userToken: this.$root.utoken,
      }).then((res) => {
        if (!res.data) return;
        this.stockList = res.data.listStocks;
        // this.riskTip = res.data[0].huntBankerSimpleTip.riskTip;
        // this.summaryTip = res.data[0].huntBankerSimpleTip.summaryTip;
        this.fiveResult = this.stockList[0].fiveResult;
        setTimeout(() => {
          const els = document.getElementsByTagName('a');
          const len = els.length;
          for (let i = 0; i < len; i += 1) {
            ((j) => {
              const el = els[j];
              const url = el.href;
              if (url.indexOf('niu://niumark.markdown') >= 0) {
                const params = this.search(url.split('?')[1]);
                if (params.type && params.type === '150') {
                  el.href = '###';
                  el.onclick = () => {
                    bridge.toQuote(params.innerCode, params.secuCode, params.secuName, params.market);
                    return false;
                  };
                } else {
                  el.style.color = 'rgb(42, 65, 89)';
                }
              } else {
                el.style.color = 'rgb(42, 65, 89)';
              }
            })(i);
          }
        }, 1000);
      });
    },
    search(s) {
      let ss;
      let i;
      const sss = {};
      if (s) {
        if (s) {
          ss = s.split('&');
          for (i = 0; i < ss.length; i += 1) {
            const p = ss[i].split('=');
            sss[p[0]] = p[1];
          }
        }
      }
      return sss;
    },
    timeformat(s) {
      return s.substr(0, 10).replace(/-/g, '');
    },
    toQuote(itm) {
      bridge.toQuote(itm.innercode, itm.stockcode, itm.stockname, itm.market);
    },
    className(str) {
      if (str.substr(0, 1) === '+') {
        return 'fontred';
      } else if (str.substr(0, 1) === '-') {
        return 'fontgreen';
      }
      return 'fontgray';
    },
    buyClick() {
      if (bridge.search('share')) {
        // down.download();
        location.href = `https://h5.stockhn.com/public/pay/index.html?usertoken=${this.$root.utoken}&courseid=4379`;
      } else {
        bridge.toCoursePayment('4380', '');
      }
    },
    lookOver() {
      // eventBus.$emit(LIST_SHOW, false);
      // location.href = `${location.origin}/course/course-list/index.html?cid=4380&usertoken=${this.$root.utoken}`;
      this.$router.push({
        name: 'list',
      });
    },
    bindClick() {
      location.href = 'https://h5.niuguwang.com/course/wechat-course/index.html?isbuy=1&4380';
    },
  },
});
