<template>
  <keep-alive>
    <template v-if="$root.isBuy">
      <div class="container">
        <after-view></after-view>
        <div class="btn-pane afterbtn" v-if="showBtn">
          <div class="buy-btn" @click=buyClick>
            <h6>立即续订</h6>
            <p>{{$root.validity}}</p>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <before-view></before-view>
    </template>
  </keep-alive>

</template>
<script type="text/ecmascript-6">
import bridge from "ng-bridge";
import AfterView from "../after/index.js";
import BeforeView from "../before/index.vue";
export default {
  name: "index",
  data() {
    return {
      showBtn: false,
    };
  },
  components: {
    BeforeView,
    AfterView
  },
  mounted() {
    if (!bridge.search('cn')) {
      this.showBtn = true;
    }
  },
  methods: {
    buyClick() {
      bridge.utoken(usertoken => {
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

</style>
