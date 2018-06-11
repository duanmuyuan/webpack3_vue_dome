<template>
  <div class="before-wrapper">
    <div class="container">
      <div class="before">
        <img src="../images/before01.png" alt="">
        <img src="../images/before02.png" alt="">
        <img src="../images/before03.png" alt="">
        <img src="../images/before04.png" alt="">
        <div class="buy">
          <div class="call">
            <div class="call-left">
              <p class="num">
                <b>官方客服电话</b>
                <a href="tel:010-8474-8078">010-8474-8078</a>
              </p>
            </div>
            <a class="call-right" href="tel:010-8474-8078">
              拨打
            </a>
          </div>
          <div class="call">
            <div class="call-left">
              <p class="num">
                <b>服务监督电话</b>
                <a href="tel:021-2509-9066">021-2509-9066</a>
              </p>
            </div>
            <a class="call-right" href="tel:021-2509-9066">
              拨打
            </a>
          </div>
        </div>
        <div class="agreement">
          风险提示：股市有风险，入市需谨慎。本产品所有提示及业务展现均不构成买卖建议。点立即购买按钮代表同意 
          <a href="https://h5.niuguwang.com/appinline/2018y/agreement/investment.html">《海能投教产品服务协议》</a>并已阅知 
          <a href="https://h5.niuguwang.com/appinline/2018y/agreement/sea-risk.html">《风险揭示书》</a>。
          VIP课程由上海海能证券投资顾问有限公司（业务资格许可证：zx0098）提供。
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-btn-wrapper">
      <section class="nolive-special" v-if="!isLive">
        <div class="bottom-btn nolive-btn clearfix">
          <span @click="buyNoLive">立即购买</span>
        </div>
      </section>
      <section class="live-special" v-else>
        <div class="bottom-btn live-btn">
          <span @click="buyLive">立即购买</span>
        </div>
        <div class="dialog-wrapper" v-if="auditPopupVisible">
          <div class="dialog-container" @click="auditPopupVisible=false"></div>
          <div class="dialog-content">
            <template v-if="notAudit">
              <p class="tit">您尚未接受合规审核</p>
              <p class="literals">抱歉，您因尚未接受合规审核，暂时无法享受VIP服务请留意电话，或主动拨打客服电话</p>
            </template>
            <template v-if="notThrough">
              <p class="tit">您未通过合规审核</p>
              <p class="literals">抱歉，您未通过合规审核，无法享受该服务 退款将在7个工作日内返还原支付账户，详情可咨询客服</p>
            </template>
            <p class="phone">
              <span>客服电话：</span>
              <a href="tel:010-87482805">010-87482805</a>
            </p>
            <div class="dialog-close clse" @click="auditPopupVisible=false">知道了</div>
          </div>
        </div>
      </section>
    </div>
    <div class="haveBuy" @click="handleBuy">
      <img :src="require('../images/download.png')" alt=""/>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from "vue";
import { mapState } from "vuex";
import bridge from "ng-bridge";
import { COURSE_ID, USERTOKEN } from "../api/index.js";

export default {
  data() {
    return {
      wxh: bridge.search("wxh") || "stockhn102",
      isHide: true,
      auditPopupVisible: false
    };
  },
  computed: {
    ...mapState(["notAudit", "notThrough", "isLive"])
  },
  mounted() {
  },
  methods: {
    // 不含直播的页面的支付事件
    buyNoLive() {
      if (USERTOKEN) {
        window.location.href = `/public/pay/index.html?courseid=${COURSE_ID}`
      } else {
        window.location.href = '/public/login/index.html';
      }
    },
    // 含直播的页面的支付事件
    buyLive() {
      if (this.notAudit || this.notThrough) {
        this.auditPopupVisible = true;
      } else {
        this.buyNoLive();
      }
    },
    handleBuy() {
      const usertoken = USERTOKEN;
      if (usertoken) {
        window.location.href = `/public/pay/index.html?courseid=${COURSE_ID}`;
      } else {
        window.location.href = '/public/login/index.html';
      }
    }
  }
};
</script>
<style rel="stylesheet/sass" lang="scss" type="text/sass" scoped>
@import "../lib/common.scss";
.before-wrapper {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #000000;
  .container {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .before {
      .buy {
        padding: pxToRem(16px);
        .t {
          width: 100%;
          height: pxToRem(24px);
          margin-bottom: pxToRem(5px);
          line-height: pxToRem(24px);
          font-size: 16px;
          text-align: center;
          color: rgb(153, 153, 153);
          span {
            margin: 0 pxToRem(5px);
          }
          img {
            display: inline-block;
            width: pxToRem(12px);
            vertical-align: middle;
          }
        }
        .call {
          display: flex;
          width: 100%;
          height: pxToRem(40px);
          align-items: center;
          .call-left {
            width: pxToRem(250px);
            flex: 1;
            font-size: 16px;
            b {
              color: #A37843;
            }
            a {
              color: #F0C074;
              padding-left: pxToRem(15px);
            }
          }
          .call-right {
            display: block;
            border: 1px solid #F0C074;
            line-height: pxToRem(30px);
            text-align: center;
            border-radius: 15px;
            color: #F0C074;
            font-size: 14px;
            height: pxToRem(30px);
            width: pxToRem(63px);
          }
        }
      }
      img {
        display: block;
        width: 100%;
        height: auto;
      }
      .agreement {
        color: #7D5C33;
        font-size: 12px;
        margin: pxToRem(10px) pxToRem(16px);
        a {
          color: #F0C074;
        }
      }
    }
  }
  .bottom-btn-wrapper{
    flex: 0 0 auto;
    height: pxToRem(70px);
  }
  .haveBuy {
    position: fixed;
    right: 0;
    top: pxToRem(200px);
    z-index: 100;
    img {
      width: pxToRem(75px);
      height: pxToRem(30px);
    }
  }
}

.bottom-btn {
  height: pxToRem(70px);
  background-size: 100% 100%;
}
.nolive-btn {
  padding: 0 pxToRem(12px);
  text-align: center;
  img {
    float: left;
    width: pxToRem(174px);
    height: pxToRem(53px);
    display: block;
    margin-top: pxToRem(15px);
  }
  > span {
    margin: 0.4rem 0 0;
    display: block;
    color: #1D1A16;
    font-weight: bold;
    height: pxToRem(45px);
    line-height: pxToRem(45px);
    background: linear-gradient(to top, #9A713D, #F0C074);
    color: #1D1A16;
    font-size: pxToRem(17px);
    text-align: center;
  }
  #wxbtn {
    background: #458cf5;
    float: right;
  }
}
.live-special {
  .live-btn {
    padding: 0 pxToRem(12px);
    > span {
      margin: 0.4rem 0 0;
      display: block;
      color: #1D1A16;
      font-weight: bold;
      height: pxToRem(45px);
      line-height: pxToRem(45px);
      background: linear-gradient(to top, #9A713D, #F0C074);
      color: #1D1A16;
      font-size: pxToRem(17px);
      text-align: center;
    }
  }
  .dialog-wrapper {
    .dialog-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1000;
    }
    .dialog-content {
      position: fixed;
      z-index: 1001;
      top: 50%;
      left: 50%;
      width: 80%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: pxToRem(6px);
      font-size: 16px;
      line-height: 1.5;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12);
      .tit {
        font-size: 16px;
        text-align: center;
        margin: pxToRem(15px) 0;
      }
      .literals {
        font-size: 14px;
        margin: 0 pxToRem(12px);
        margin-bottom: pxToRem(15px);
        color: #999;
      }
      .phone {
        text-align: center;
        color: #999;
        padding: pxToRem(12px) 0;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
      .dialog-close {
        text-align: center;
        margin: pxToRem(15px) 0;
        color: #26a2ff;
      }
    }
  }
}
</style>