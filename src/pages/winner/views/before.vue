<template>
  <div class="before-wrapper">
    <div class="container">
      <div class="before">
        <img src="../images/before-banner.jpg" alt="">
        <img src="../images/before/winner-image1.png" alt="">
        <div class="swiper">
          <mt-swipe :auto="4000">
            <mt-swipe-item>
              <img src="../images/before/t1.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../images/before/t2.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img src="../images/before/t3.jpg" alt="">
            </mt-swipe-item>
          </mt-swipe>
          <!-- <img src="../images/before/tag.png" alt="" class="imgIcon"> -->
        </div>
        <img src="../images/before/winner-image2.png" alt="">
        <img src="../images/before/winner-image3.png" alt="">
        <!-- <img src="../images/before/image4.png" alt=""> -->
        <div class="buy">
          <div class="call">
            <div class="call-left">
              <p class="num">
                <b>官方客服电话</b>
                <a href="tel:021-2509-9066">021-2509-9066</a>
              </p>
              <p class="time">周一到周五：09:00-18:00</p>
            </div>
            <a class="call-right" href="tel:021-2509-9066">
              <img src="../images/before/call.jpg" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mark-pane" v-show="!isHide" @click="isHide=true"></div>
    <div class="bomb-pane" v-show="!isHide">
      <img src="../images/confirm.png" alt="" />
      <p class="copy-success">复制成功</p>
      <p>微信号
        <span class="wechat-num wxh">{{wxh}}</span>复制成功
        <br/>点击跳转微信添加助理</p>
      <div class="bomb-add clse" @click="closeBomb">立即添加</div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-btn-wrapper">
      <section class="nolive-special" v-if="!isLive">
        <div class="bottom-btn nolive-btn clearfix">
          <template v-if="!isBuyBtn">
          <span @click="buyNoLive">立即购买</span>
          </template>
          <span @click="copyWXH" id="wxbtn" :data-clipboard-text="wxh">
            <template v-if="!isBuyBtn">申请试听</template>
            <template v-else>在线咨询</template>
          </span>
        </div>
      </section>
      <section class="live-special" v-else>
        <div class="bottom-btn nolive-btn live-btn">
          <template v-if="!isBuyBtn">
            <img src="../images/before/buy2.png" alt="" @click="buyLive">
          </template>
          <template v-else>
          <span @click="copyWXH" id="wxbtn" :data-clipboard-text="wxh">
            <template v-if="!isBuyBtn">申请试听</template>
            <template v-else>在线咨询</template>
          </span>
          </template>
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
              <a href="javascript: void(0)" @click="telPhone('010-87482805')">010-87482805</a>
            </p>
            <div class="dialog-close clse" @click="auditPopupVisible=false">知道了</div>
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
import Clipboard from "clipboard";
import { Swipe, SwipeItem, Toast, MessageBox } from "mint-ui";
import { COURSE_ID } from "../api/index.js";

export default {
  data() {
    return {
      wxh: bridge.search("wxh") || "stockhn102",
      isHide: true,
      clipboard: null,
      auditPopupVisible: false,
      isBuyBtn: false,
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Toast
  },
  computed: {
    ...mapState(["notAudit", "notThrough", "isLive"])
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.clipboard = new Clipboard("#wxbtn");
      bridge.getVersion((vs) => {
        const u = navigator.userAgent, app = navigator.appVersion;
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        if (isIOS) {
          this.isBuyBtn = vs.replace(/\./g, '') >= 437;
        }
      });
    },
    copyWXH() {
      this.clipboard.on("success", e => {
        e.clearSelection();
        this.isHide = false;
      });
      this.clipboard.on("error", e => {
        Toast("发生错误");
        this.isHide = true;
      });
    },
    closeBomb() {
      this.isHide = true;
      location.href = "weixin://";
    },
    telPhone(tel) {
      bridge.telPhone(tel);
    },
    // 不含直播的页面的支付事件
    buyNoLive() {
      bridge.utoken(usertoken => {
        if (usertoken) {
          this.$store.commit("SET_USERTOKEN", usertoken);
          bridge.toCoursePayment(COURSE_ID, "");
        } else {
          this.$store.commit("SET_USERTOKEN", "");
          bridge.login();
        }
      });
    },
    // 含直播的页面的支付事件
    buyLive() {
      if (this.notAudit || this.notThrough) {
        this.auditPopupVisible = true;
      } else {
        this.buyNoLive();
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
  .container {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .before {
      .swiper {
        position: relative;
        .imgIcon {
          width: pxToRem(75px);
          height: auto;
          position: absolute;
          top: pxToRem(11.5px);
          left: pxToRem(16.5px);
        }
      }
      .mint-swipe {
        height: pxToRem(230px);
        .mint-swipe-indicators {
          position: absolute;
          bottom: 0;
          .mint-swipe-indicator {
            width: pxToRem(12px);
            height: pxToRem(12px);
            &.is-active {
              background-color: rgb(255, 76, 81) !important;
              opacity: 1;
            }
          }
        }
      }
      .buy {
        padding: pxToRem(16px);
        background: #fff;
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
          height: pxToRem(70px);
          align-items: center;
          background: #fff;
          .call-left {
            width: pxToRem(250px);
            flex: 1;
            font-size: 17px;
            a {
              color: rgb(219, 179, 124);
              padding-left: pxToRem(15px);
            }
            p.time {
              margin-top: pxToRem(8px);
              font-size: 12px;
              color: rgb(153, 153, 153);
            }
          }
          .call-right {
            text-align: right;
            img {
              width: pxToRem(63px);
              height: pxToRem(30px);
            }
          }
        }
      }
      .tips {
        width: 100%;
        height: pxToRem(68px);
        padding: pxToRem(13px);
        text-align: justify;
        font-size: 9px;
        background: rgb(236, 238, 241);
      }
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
  .bottom-btn-wrapper{
    flex: 0 0 auto;
    height: pxToRem(70px);
  }
}

#cpLink {
  position: absolute;
  left: -9999px;
  top: -999999px;
}
.mark-pane {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.bomb-pane {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  width: pxToRem(270px);
  height: pxToRem(290px);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 0.26667rem;
  font-size: 16px;
  line-height: 1.5;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  img {
    display: block;
    width: pxToRem(49px);
    height: auto;
    margin: pxToRem(30px) auto;
  }
  p {
    margin: pxToRem(10px) auto;
    text-align: center;
    span {
      color: rgb(226, 73, 45);
    }
  }
  .bomb-add {
    width: pxToRem(240px);
    height: pxToRem(40px);
    margin: pxToRem(25px) auto;
    background-color: #f26e54;
    line-height: pxToRem(40px);
    font-size: p18px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
  }
  .copy-success {
    font-size: pxToRem(18px);
    font-weight: 700;
    margin-top: pxToRem(16px);
  }
}
.bottom-btn {
  height: pxToRem(70px);
  background: url("../images/before/bg.png");
  background-size: 100% 100%;
}
.nolive-btn {
  padding: 0 pxToRem(6px);
  text-align: center;
  display: flex;
  // justify-content: space- between;
  img {
    width: pxToRem(174px);
    height: pxToRem(53px);
    display: block;
    margin: 0 auto;
  }
  > span {
    flex: 1;
    margin: 0.4rem .2rem;
    display: block;
    font-weight: bold;
    height: pxToRem(45px);
    line-height: pxToRem(45px);
    background: #ff4c51;
    float: left;
    color: #fff;
    font-size: 15px;
    text-align: center;
  }
  #wxbtn {
    background: #458cf5;
    // float: right;
  }
}
.live-special {
  .live-btn {
    img {
      width: 100%;
      height: pxToRem(70px);
      display: block;
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