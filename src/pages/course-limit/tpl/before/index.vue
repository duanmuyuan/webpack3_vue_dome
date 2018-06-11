<template>
  <div class="before-view">
    <section class="section section1" v-if="datasummary">
      <p class="introduction">
        运用西蒙法则和盘口数据对两市3000多只个股进行去劣选优，开盘选入5只个股，把握涨停机会，订阅涨停先知，盈利近在咫尺！
      </p>
      <div class="stock-data">
        <p class="stock-label-1">涨停的天数高达</p>
        <p class="stock-label-2">
          <!-- <strong>{{filterSymbol(datasummary.limittimesdisplay)}}</strong> -->
          <strong>60</strong>
          <span>%</span>
        </p>
        <!-- <p class="stock-label-3">平均两天抓一只涨停</p> -->
        <p class="stock-label-3"></p>
      </div>
      <div class="stock-num">
        <div class="num-1">
          <p class="label">赚钱概率</p>
          <p class="num">
            <strong>65</strong>
            <span>%</span>
          </p>
        </div>
        <div class="num-2">
          <p class="label">T+1最高收益</p>
          <p class="num">
            <strong>18.90</strong>
            <span>%</span>
          </p>
        </div>
      </div>
      <p class="ps">由近三个月数据回测得出以上数据</p>
    </section>
    <section class="section section2">
      <div class="sec sec1">
        <i class="sec-title"></i>
        <table>
          <thead>
            <tr class="tab-top">
              <td>入选时间</td>
              <td>入选股票</td>
              <td>入选价格/T+1收益</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" v-if="list && list.length" :key="item.innercode">
              <td>{{filterTime(item.adddatetime)}}</td>
              <td>
                <strong>{{item.stockname}}</strong>
                <span>{{item.stockcode}}</span>
              </td>
              <td class="last">
                <strong>{{filterNumber(item.selectedprice)}}</strong>
                <span>{{item.t1display}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section section3">
      <i class="sec-title"></i>
      <div class="sec sec1">
        <p class="title">
          <span class="stock-name">贵州燃气</span>
          <span class="stock-code">600903</span>
        </p>
        <p class="instruction">
          当日02-26和03-01连续两日早盘入选，当日涨停，次日连板，四天抓三个涨停！
        </p>
        <img src="../../images/image2@2x.png" alt="" class="img1">
        <img src="../../images/image1@2x.png" alt="" class="img2">
      </div>
      <div class="sec sec1">
        <p class="title">
          <span class="stock-name">中成股份</span>
          <span class="stock-code">000151</span>
        </p>
        <p class="instruction">
          当日03-15早盘入选，当日强势涨停，次日完美封板！
        </p>
        <img src="../../images/image4@2x.png" alt="" class="img1">
        <img src="../../images/image3@2x.png" alt="" class="img2">
      </div>
    </section>
    <!-- <section class="section section4">
      <p class="text">
        <span>没有第一时间收到推送通知？</span>
        <img src="../../images/arrow-right@2x.png" />
        <em>推送通知设置教程</em>
      </p>
    </section> -->
    <section class="section5">
      <p class="text">
        风险提示：历史回测数据不代表未来趋势；本产品利用市场公开数据经大数据智能分析运算，相关结论仅供参考，不构成投资建议，据此操作，盈亏自负；技术指标存在客观局限性，不同历史时期市场环境下表现有差异，不具备普适性；股市有风险，投资需谨慎。
        <br/>本页面内容及产品服务均为上海海能证券投资顾问有限公司（业务资格许可证号：zx0098）提供。
      </p>
    </section>
    <div class="btn-pane  border-ios" v-if="showBtn">
      <!-- 左侧的价格区域 -->
      <div class="check-wrapper">
        <p class="price">
          <b>¥990/月</b>
          <del>¥1999/月</del>
        </p>
      </div>
      <!-- 点击按钮 -->
      <div class="buy-btn" @click="buyClick">立即订阅</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from "vue";
import bridge from "ng-bridge";
import API from "../../api/api.js";

export default {
  data() {
    return {
      datasummary: null,
      list: null,
      sectShow: false,
      priceData: null,
      showBtn:  false,
    };
  },
  created() {
    this.init();
    if (!bridge.search('cn')) {
      this.showBtn = true;
    }
  },
  methods: {
    init() {
      API.getBeforeData().then(res => {
        if (+res.code === 200) {
          this.datasummary = res.datasummary;
          this.list = res.data;
          // console.log(this.list)
        }
      });
    },
    filterSymbol(str) {
      return str.endsWith("%") ? str.slice(0, str.length - 1) : str;
    },
    filterTime(str) {
      return str.split("-").join('.');
    },
    filterNumber(str) {
      return Number(str).toFixed(2);
    },
    buyClick() {
      bridge.utoken((usertoken) => {
        if (usertoken) {
          bridge.toCoursePayment("4385", "");
        } else {
          bridge.login();
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/sass" lang="scss" type="text/sass">
@import "../../lib/common.scss";

.before-view {
  color: #fff;
  font-size: 14px;
  .section {
    background-repeat: no-repeat;
    background-size: cover;
    .sec {
      padding: 0 size(33);
      .sec-title {
        display: block;
        width: size(100);
        height: size(37);
        margin-bottom: size(15);
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
  .section1 {
    height: size(546);
    position: relative;
    text-align: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("../../images/zt-bg1@2x.jpg");
    .introduction {
      padding: size(204) size(34) 0;
      line-height: 1.3;
      opacity: 0.9;
      text-align: left;
    }
    .stock-data {
      width: 100%;
      position: absolute;
      bottom: size(140);
      text-align: center;
      .stock-label-1 {
        color: #dddee3;
      }
      .stock-label-2 {
        color: #ec3c65;
        line-height: 1;
        margin: size(12) 0 size(5);
        > strong {
          font-size: 46px;
        }
        span {
          font-size: 20px;
        }
      }
      .stock-label-3 {
        color: #ec3c65;
        line-height: 1;
        margin-bottom: size(23);
      }
    }
    .stock-num {
      position: absolute;
      bottom: size(60);
      display: flex;
      justify-content: center;
      width: 100%;
      > div {
        width: size(140);
        height: size(85);
        margin: size(0) size(9);
        background-size: cover;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 14px;
        color: #dddee3;
        .label {
          margin: size(10) 0;
        }
        .num {
          line-height: 1;
          > strong {
            font-size: 29px;
          }
          > span {
            font-size: 14px;
          }
        }
      }
      .num-1 {
        @include bg-image("../../images/sec-1-bg1");
      }
      .num-2 {
        @include bg-image("../../images/sec-1-bg2");
      }
    }
    .ps {
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: size(34);
      color: #4e47ba;
      font-size: 12px;
    }
  }
  .section2 {
    padding-top: size(109);
    position: relative;
    height: size(448);
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("../../images/bg2@2x.jpg");
    .sec1 {
      .sec-title {
        @include bg-image("../../images/sec2-title1");
      }
      > table {
        width: 100%;
        border-top: 1px solid #3b34a9;
        .tab-top {
          font-size: 12px;
          color: #4365e7;
          line-height: size(30);
          height: size(30);
        }
        tr {
          display: flex;
          border-bottom: 1px solid #3b34a9;
          height: size(48);
          td:nth-of-type(1) {
            width: 30%;
            flex: 0 0 auto;
          }
          td:nth-of-type(2) {
            width: 30%;
            flex: 0 0 auto;
          }
          td:nth-of-type(3) {
            flex: 1;
            text-align: right;
          }
        }
        tbody {
          tr {
            td:nth-of-type(1) {
              line-height: size(48);
            }
            td:nth-of-type(2),
            td:nth-of-type(3) {
              font-size: 14px;
              line-height: 1.3;
              padding-top: size(6);
              box-sizing: border-box;
              > strong {
                font-size: 14px;
                display: block;
                color: #fff;
              }
              > span {
                display: block;
                color: #8997a5;
              }
            }
            td:nth-of-type(3) {
              > strong {
                color: #ff4c51;
              }
              > span {
                color: #ff4c51;
              }
            }
          }
        }
      }
    }
  }
  .section3 {
    position: relative;
    height: size(787);
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("../../images/bg3@2x.jpg");
    .sec-title {
      @include bg-image("../../images/sec2-title2");
      display: block;
      width: size(100);
      height: size(37);
      background-repeat: no-repeat;
      background-size: cover;
      margin: 0 size(33) size(15);
    }
    .sec {
      padding: 0 size(16) 0;
      .title {
        width: size(188);
        height: size(35);
        line-height: size(35);
        background-repeat: no-repeat;
        background-size: 100%;
        @include bg-image("../../images/title-bg");
        .stock-name {
          font-size: 16px;
          color: #fff;
          margin: 0 size(11) 0 size(17);
        }
        .stock-code {
          font-size: 14px;
          color: #dddee3;
        }
      }
      .instruction {
        margin: size(7.5) size(16) 0;
      }
      .img1 {
        width: size(309);
        height: size(108);
        display: block;
        margin: size(26) size(16) size(16);
      }
      .img2 {
        width: size(309);
        height: size(108);
        display: block;
        margin: size(0) size(16) size(29);
      }
    }
  }
  .section4 {
    height: size(89);
    @include bg-image("../../images/bg4");
    .text {
      margin: 0 size(30) 0 size(35);
      font-size: 12px;
      line-height: 1;
      padding: size(39) 0;
      box-sizing: border-box;
      span {
        color: #4365e7;
      }
      em {
        font-style: normal;
        color: #ec3c65;
        float: right;
      }
      img {
        float: right;
        width: size(6);
        height: size(10);
        margin-left: size(4);
      }
    }
  }
  .section5 {
    background: #13045a;
    padding: size(15) size(16) size(75);
    .text {
      color: #3b34a9;
      line-height: 1.5;
      font-size: 11px;
    }
  }
  .btn-pane {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: size(55);
    background-color: #fff;
    .check-wrapper {
      flex: 1;
      display: flex;
      .price {
        width: 100%;
        box-sizing: border-box;
        padding-left: size(16);
        height: size(55);
        line-height: size(55);
        color: #2a4159;
        background: #F0F1F9;
        >b {
          font-size: 21px;
          margin-right: size(8);
        }
        >del{
          font-size: 12px;
        }
      }
      .arrow {
        display: block;
        width: size(11);
        height: size(7);
        margin-top: size(24);
        float: right;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: size(16);
        @include extend-click;
      }
      .arrow-down {
        @include bg-image("../../images/arrow-down");
      }
    }
    .buy-btn {
      flex: 0 0 auto;
      width: size(145);
      height: size(55);
      line-height: size(55);
      color: #fff;
      font-size: 21px;
      text-align: center;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: cover;
      @include bg-image("../../images/button");
      border: none;
      -webkit-tap-highlight-color: transparent;
    }
  }
}
</style>

