<template>
  <div class="home-wrapper">
    <!-- <before-view v-if="type==='before'" /> -->
    <after-view v-if="type==='after'" :isFirstTime="isFirstTime" :agreementMsgs="agreementMsgs" />
    <before-view v-else />
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from "vue";
import bridge from "ng-bridge";
import { getIsBuy, COURSE_ID, COURSE_TYPES } from "../api/index.js";
import BeforeView from "./before.vue";
import AfterView from "./after.vue";

export default {
  data() {
    return {
      type: "",
      // 是否是第一次进入此课程页面
      isFirstTime: false,
      // 从后端拿的弹框中的信息
      agreementMsgs: {},
    };
  },
  components: {
    BeforeView,
    AfterView
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      bridge.init();
      bridge.initRefresh(1);
      this.fetchToken();
      this.filterLive();
    },
    fetchToken() {
      bridge.utoken((usertoken = bridge.search('usertoken')) => {
        let notAudit = false;
        let notThrough = false;
        if (usertoken) {
          getIsBuy({
            usertoken,
            action: "isbuy",
            courseid: COURSE_ID,
            date: new Date()
          }).then(res => {
            // 未审核
            console.log(res);
            if (+res.orderStatus === 10) {
              notAudit = true;
            }
            // 未通过
            if (+res.orderStatus === 11) {
              notThrough = true;
            }
            if (Number(res.code) === 0 && Number(res.result) === 1) {
              // bridge.onQuShiWenYingLogin();
              this.type = "after";
              if (res.message) {
                this.$store.commit("SET_VALID_TIME", res.message);
              }
              if (+res.isShowRisk === 1) {
                this.isFirstTime = true;
                // 转换后端给的弹框信息：利用正则，匹配拼接
                this.agreementMsgs = {
                  content: res.agreementtext,
                  agreement: res.newagreementtext.replace(/\《.+?\》/g, (match, p1, p2) => {
                    if (p1) {
                      return `<a href="${res.hdurl}">${match}</a>`;
                    }
                    if (p2) {
                      return `<a href="${res.riskurl}">${match}</a>`;
                    }
                  }),
                }
              }
            } else {
              this.type = "before";
            }
            this.$store.commit("SET_USERTOKEN", usertoken);
            this.$store.commit("SET_NOT_AUDIT", notAudit);
          });
          this.$store.commit("SET_NOT_THROUGH", notThrough);
        } else {
          this.$store.commit("SET_USERTOKEN", "");
          this.type = "before";
        }
      });
    },
    filterLive() {
      let isLive = false;
      if (Number(bridge.search("applive")) === 1) {
        isLive = true;
      }
      this.$store.commit("SET_LIVE", isLive);
    }
  }
};
</script>
<style rel="stylesheet/sass" lang="scss" type="text/sass">
.home-wrapper{
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>