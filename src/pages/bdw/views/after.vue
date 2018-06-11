<template>
  <div class="after-wrapper" ref="after">
    <a href="tel:4006255268"><img src="https://img.niuguwang.com/2017/08/4/M_218A943F1D1825ADDBA5FC40511FB40A.png" alt="Tel" class="float-tel"></a>
    <div class="after-content" ref="after">
       <img src="../images/after-banner.png" alt="banner" class="banner"> 
      <!-- 今日策略 -->
      <introduction />
      <!-- vip直播室 -->
      <live v-if="!isLive" />
      <!-- <live /> -->
      <!-- 股票池 -->
      <!-- <pool /> -->
      <!-- 机构池 -->
      <company />
      <!-- 独家内参 -->
      <information />
      <!-- 客服电话-->
      <div class="tels">
        <div class="tel-content">
          <span class="tels-tips">
            <b>客服电话</b>
            <i>交易日 09:00-18:00</i>
          </span>
          <div class="tels-no">
            <a href="tel:02125099066">021-2509-9066</a>
          </div>
          <div class="tels-img">
            <a href="tel:02125099066">拨打</a>
          </div>
        </div>
        <div class="tel-content">
          <span class="tels-tips">
            <b>服务监督电话</b>
          </span>
          <div class="tels-no">
            <a href="tel:4006255268">400-625-5268</a>
          </div>
          <div class="tels-img">
            <a href="tel:4006255268">拨打</a>
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="after-btn-pane">
        <div class="btn-pane" @click="toPay">
          <b>立即续订</b>
          <span>{{validtime}}</span>
        </div>
      </div>
      <!-- 声明 -->
      <p class="statement">
        点击立即续订按钮代表同意
        <a href="https://h5.niuguwang.com/appinline/2018y/agreement/investment.html">《海能投教产品服务协议》，</a>
        并已阅知
        <a href="https://h5.niuguwang.com/appinline/2018y/agreement/sea-risk.html">《风险揭示书》</a>
        ，VIP课程由上海海能证券投资顾问有限公司（业务资格许可证号：zx0098）提供。
      </p>
       <mt-popup v-model="popupVisible"> 
        <section class="before-remind-popup">
          <p class="remind-content">
            {{agreementMsgs.content}}
          </p>
          <p class="remind-checkbox">
            <label @click.prevent="tabAgreement">
              <input type="checkbox" v-model="agreementCheckboxValue">
              <span v-html="agreementMsgs.agreement"></span>
            </label>
          </p>
          <button class="before-remind-confirm-button" @click="popupCheckPay">知道了</button>
        </section>
       </mt-popup> 
      <!-- 风险测试，目前是直播间的有此功能 -->
      <section v-if="isLive && !hadTest">
        <div class="mark-pane"></div>
        <div class="bomb-pne">
          <p>趋势稳盈战法邀请您在投资本产品之前先填写此风险测评问卷，旨在了解您可承受的风险程度，同时也可协助您选择更合适的理财产品。</p>
          <h5>TIP:本次测评共20题，预计需要2分钟。</h5>
          <div class="btn" @click="gotoRiskTest">
            开始评测
          </div>
        </div>
      </section>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import Vue from "vue";
import { mapState } from "vuex";
import bridge from "ng-bridge";
import { MessageBox, Toast, Popup } from "mint-ui";
import Introduction from "../components/introduction.vue";
import Live from "../components/live.vue";
import Pool from "../components/pool.vue";
import Company from "../components/company.vue";
import Information from "../components/information.vue";
import { getIsBuy, getRiskTest, COURSE_ID, USERTOKEN } from "../api/index.js";
import { addClass, removeClass } from "../lib/util.js";
export default {
  data() {
    return {
      hadTest: true,
      popupVisible: false,
      agreementCheckboxValue: false
    };
  },
  props: ["isFirstTime", "agreementMsgs"],
  components: {
    Introduction,
    Live,
    Pool,
    Company,
    Information,
    [MessageBox.name]: MessageBox,
    [Popup.name]: Popup
  },
  computed: {
    ...mapState(["usertoken", "validtime", "isLive"])
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.riskTest();
      this.goTo();
      this.checkFirstTime();
    },
    checkFirstTime() {
      if (this.isFirstTime && !bridge.search('applive')) {
        this.popupVisible = true;
      }
    },
    popupCheckPay() {
      if (!this.agreementCheckboxValue) {
        Toast({
          message: "请先勾选协议！",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      // 勾选了同意协议，信息传给后端
      getIsBuy({
        usertoken: USERTOKEN,
        action: "setriskconfirm",
      }).then(res => {
        if (+res.code === 0) {
          this.popupVisible = false;
        } else {
          Toast('数据存储失败，请联系管理员');
        }
      });
    },
    toPay() {
      console.log("去付款了");
      window.location.href = `/public/pay/index.html?courseid=${COURSE_ID}`
    },
    tabAgreement() {
      this.agreementCheckboxValue = !this.agreementCheckboxValue;
      const confirmButton = document.getElementsByClassName(
        "before-remind-confirm-button"
      )[0];
      if (this.agreementCheckboxValue) {
        addClass(confirmButton, "red");
      } else {
        removeClass(confirmButton, "red");
      }
    },
    goTo() {
      if (bridge.search("to")) {
        this.$nextTick(() => {
          this.$refs.after.scrollTop = document.getElementById(
            bridge.search("to")
          ).offsetTop;
        });
      }
    },
    riskTest() {
      const usertoken = USERTOKEN;
      if (USERTOKEN) {
        getRiskTest({
          usertoken,
          action: "getrisktype"
        }).then(res => {
          if (+res.code === 0) {
            this.hadTest = Number(res.isclose) > 0;
          }
        });
      }
    },
    gotoRiskTest() {
      const payms = `usertoken=${this.usertoken}&courseid=${COURSE_ID}`;
      location.href = `https://h5.niuguwang.com/huodong/2017Y3Q/risk-assess/index.html?${payms}`;
    }
  }
};
</script>
<style rel="stylesheet/sass" lang="scss" type="text/sass">
@import "../lib/common.scss";
.after-wrapper {
  height: 100%;
  overflow: hidden;
  position: relative;
  .float-tel {
    position: absolute;
    right: 0;
    top: pxToRem(100px);
    width: pxToRem(85px);
    height: pxToRem(28px);
    z-index: 99;
  }
}
.after-content {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .banner {
    display: block;
    margin: 0 auto;
    height: pxToRem(150px);
  }
  .tels {
    background: #fff;
    padding: pxToRem(10px) pxToRem(13px);
    margin-bottom: pxToRem(16px);
    .tel-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    span {
      display: block;
    }
    .tels-tips {
      line-height: pxToRem(30px);
      font-size: 17px;
      b {
        &:last-child {
          padding-top: pxToRem(10px);
        }
        display: block;
      }
    }
    .tels-no {
      line-height: pxToRem(30px);
      font-size: 17px;
      text-decoration: none;
      a {
        color: #f68811;
        display: block;
        &:last-child {
          padding-top: pxToRem(10px);
        }
      }
    }
    .tel-content:first-child {
      height: pxToRem(55px);
      .tels-tips {
        display: flex;
        flex-direction: column;
        b {
          margin-top: pxToRem(20px);
        }
        i {
          font-size: 12px;
          color: #999;
          font-style: normal;
          display: block;
          margin: pxToRem(-8px) 0 pxToRem(10px);
        }
      }
    }
    .tel-content:last-child {
      .tels-no {
        a {
          color: #8997a5;
        }
      }
      .tels-img {
        a {
          background-color: #8997a5;
        }
      }
    }
    .tels-img {
      width: pxToRem(63px);
      a {
        display: block;
        width: pxToRem(63px);
        height: pxToRem(30px);
        margin-right: pxToRem(27.5px);
        color: #fff;
        background-color: #f68811;
        border-radius: pxToRem(15px);
        text-align: center;
        line-height: pxToRem(30px);
        font-size: 14px;
        &:last-child {
          margin-top: pxToRem(10px);
        }
      }
    }
  }
  .after-btn-pane {
    padding: pxToRem(10px) 0 0;
    width: 100%;
    .btn-pane {
      color: #fff;
      background-color: rgb(86, 138, 224);
      text-align: center;
      margin: 0 pxToRem(13px);
      height: pxToRem(45px);
      display: flex;
      flex-direction: column;
      b {
        font-size: 17px;
        font-weight: 600;
        height: auto;
        display: block;
      }
      span {
        display: block;
        font-size: 10px;
        line-height: pxToRem(18px);
        height: pxToRem(18px);
      }
    }
  }
  .statement {
    margin: pxToRem(15px) pxToRem(13px);
    color: #999;
    font-size: 12px;
    line-height: 1.5;
    > a {
      color: #458cf5;
    }
  }

  .mark-pane {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
  }
  .bomb-pne {
    position: fixed;
    z-index: 9999;
    width: pxToRem(270px);
    height: pxToRem(245px);
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.3rem;

    p {
      font-size: pxToRem(14px);
      line-height: pxToRem(20px);
      padding: pxToRem(30px) pxToRem(15px) pxToRem(20px);
      color: #333;
    }

    h5 {
      color: RGB(153, 153, 153);
      text-align: center;
      font-size: pxToRem(14px);
      line-height: pxToRem(20px);
      padding: 0 0 pxToRem(30px);
    }

    .btn {
      width: pxToRem(240px);
      height: pxToRem(40px);
      background-color: #458cf5;
      color: #fff;
      font-size: pxToRem(14px);
      text-align: center;
      line-height: pxToRem(40px);
      margin: 0 auto;

      a {
        color: #fff;
      }
    }
  }
}
// 弹出层
.mint-popup {
  width: pxToRem(270px);
  box-sizing: border-box;
  padding: pxToRem(25px) pxToRem(16px);
}
.before-remind-popup {
  .remind-content,
  .remind-checkbox {
    font-size: pxToRem(14px);
    color: #8997a5;
    text-align: left;
    line-height: 1.4;
    padding-bottom: pxToRem(14px);
  }
  .remind-checkbox {
    padding-bottom: pxToRem(10px);
    a {
      color: #458cf5;
    }
  }
}
.mint-toast {
  z-index: 2201;
}
.before-remind-confirm-button {
  background: #999;
  color: #fff;
  font-size: pxToRem(15px);
  height: pxToRem(40px);
  line-height: pxToRem(40px);
  border-radius: pxToRem(2px);
  margin: pxToRem(20px) 0 0;
  width: 100%;
  border: none;
}
.red {
  background: #ff4c51;
}
</style>