<template>
  <div class="container-after">
    <div class="afetrCont">
    <div class="header">
      <div class="hd-title">产品金额：{{price}}元/月<span></span>有效期至：{{this.$root.remainingTime}}</div>
      <div class="hd-cont">
        <div class="hd-top">
          <dl><dt class="fontred">{{summarydto.t1limitupdisplay}}</dt><dd>T+1涨停率</dd></dl>
          <dl><dt>{{summarydto.makemoneydisplay}}</dt><dd>赚钱概率</dd></dl>
        </div>
        <div class="hd-bom">
          <p>涨停先知将于每日9:30~10:00之前进行更新</p>
          <p>如需查看股票池个股，请使用牛股王APP</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title-pane"><span>今日先知</span></div>
      <template v-for="(item,index) in stockpool">
        <div class="item-cont border-ios" @click="buyClick">
          <div class="item">
            <div class="stock"><b>{{item.stockname}}</b><span>{{item.stockcode}}</span></div>
            <div class="profit">
              <h4 :class="className(item.maxupdownrate)">{{item.maxupdownrate}}</h4><p>当前最高收益</p>
            </div>
          </div>
          <div class="price">
            <h6 class="fontred">{{item.selectedupdownprice}}<span></span>{{item.updownrate}}</h6>
            <div class="pc-line">
              <p>入选价格</p>
              <h5>{{item.selectedprice}}</h5>
            </div>
            <div class="pc-line">
              <p>当前价格</p>
              <h5>{{item.currentprice}}</h5>
            </div>
          </div>
        </div>
      </template>
      <div class="split"></div>
      <div class="title-pane"><span>昨日先知股票池</span></div>
      <template v-for="(item,index) in preupdate">
        <div class="item-cont border-ios" @click="buyClick">
          <div class="item">
            <div class="stock"><b>{{item.stockname}}</b><span>{{item.stockcode}}</span></div>
            <div class="profit">
              <h4 :class="className(item.maxupdownrate)">{{item.maxupdownrate}}</h4><p>当前最高收益</p>
            </div>
          </div>
          <div class="price">
            <h6 class="fontred">{{item.selectedupdownprice}}<span></span>{{item.updownrate}}</h6>
            <div class="pc-line">
              <p>入选价格</p>
              <h5>{{item.selectedprice}}</h5>
            </div>
            <div class="pc-line">
              <p>当前价格</p>
              <h5>{{item.currentprice}}</h5>
            </div>
          </div>
        </div>
      </template>
        <div class="more-btn" @click="buyClick">
          <p>查看历史股票池 ></p>
        </div>
      </div>
    </div>
    <div class="btn" @click="buyClick">
      <span>下载牛股王APP，解锁有望涨停的潜力牛股</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import Vue from "vue";
import API from "../../api/api.js";
import Download from '../../../../plugins/downcom';
  
export default {
  name: 'limit',
  data() {
    return {
      stockpool: [],
      preupdate: [],
      summarydto: [],
      linfo: [],
      hasMore: '',
      poolinfo: [],
      price: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      API.WxShareStocks().then((res) => {
        if (res.code === 200) {
          this.stockpool = res.stockpool;
          this.preupdate = res.stockpoolpreupdate;
          this.summarydto = res.datasummarydto;
          this.linfo = res.stockpoolinfo;
          this.poolinfo = res.stockpoolinfo;
          this.price = res.price;
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
    buyClick() {
      Download.download();
    }
  }
}
</script>