<template>
  <div class="details-box">
    <div class="direct-card clearfix" v-for="item in roomList" :key="item.imgUrl" @click="severLive(item)">
      <img :src="item.imgUrl" class="direct-img" />
      <div class="direct-time">
        {{item.timeSpan}}
      </div>
      <div class="direct-content">
        <p class="direct-name">
          {{item.liveName}}
        </p>
        <div class="direct-tips">
          <span>{{item.startTime}}</span>
          <b class="border-ios" v-if="item.isBuy > 0">课程</b>{{item.userName}}
        </div>
      </div>
    </div>
    <div class="box-more" @click="loadMore" v-show='showloadmore'>
      <span>点击查看更多</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from "vue";
import { mapState } from "vuex";
import bridge from "ng-bridge";
import { fetchLiveListDetail } from "../api/index.js";

let currentPage = 1;

export default {
  data() {
    return {
      roomList: [],
      showloadmore: true,
    };
  },
  computed: {
    ...mapState(["usertoken"])
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetchLiveListDetail({
        id: this.$route.query.id,
        index: currentPage,
        size: 10
      }).then(res => {
        if (res && res.code === 0) {
          if (res.data.length < 10) {
            this.showloadmore = false;
          }
          this.roomList = [...this.roomList].concat(res.data);
        }
      });
    },
    severLive(item) {
      window.location.href = `/public/live/index.html?liveid=${item.liveId}&isH5=1`;
    },
    loadMore() {
      currentPage += 1;
      this.fetchData();
    },
  }
};
</script>
<style rel="stylesheet/sass" lang="scss" type="text/sass" scoped>
@import "../lib/common.scss";

.details-box {
  box-sizing: border-box;
  padding-top: pxToRem(15px);
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .tap_box {
    width: pxToRem(345px);
    height: pxToRem(40px);
    margin: 0 auto pxToRem(20px);
    color: rgb(153, 153, 153);
    line-height: pxToRem(40px);
    font-size: pxToRem(15px);
    display: flex;
    .tap-list {
      width: 30%;
      &.active {
        position: relative;
        color: #000;
        &:after {
          content: "";
          display: block;
          background-color: #ff4500;
          width: pxToRem(10px);
          height: pxToRem(2px);
          position: absolute;
          bottom: 0;
          left: pxToRem(25px);
        }
      }
    }
  }
  & .details-close {
    width: 100%;
    height: pxToRem(45px);
    border: 1px solid rgb(232, 232, 232);
    background: #fff; // z-index: 11;
    & .details-tips {
      float: left;
      height: 100%;
      line-height: pxToRem(45px);
      font-size: pxToRem(18px);
      margin-left: pxToRem(16px);
    }
    & .details-btn {
      float: right;
      width: pxToRem(53px);
      height: pxToRem(27px);
      border: 1px solid rgb(51, 51, 51);
      line-height: pxToRem(27px);
      font-size: pxToRem(14px);
      border-radius: pxToRem(4px);
      margin-right: pxToRem(15px);
      text-align: center;
      margin-top: pxToRem(9px);
      cursor: pointer;
    }
  }

  .direct-card {
    padding-left: pxToRem(13.5px);
    position: relative;
    padding-bottom: pxToRem(17.5px);
    .direct-time {
      position: absolute;
      left: pxToRem(35px);
      top: pxToRem(50px);
      z-index: 10;
      width: pxToRem(75px);
      height: pxToRem(20px);
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: pxToRem(10px);
      line-height: pxToRem(20px);
      border-radius: pxToRem(10px);
      padding-left: pxToRem(10px);
      &:before {
        content: "";
        position: relative;
        top: pxToRem(1px);
        display: inline-block;
        margin-right: pxToRem(3px);
        border-top: pxToRem(5px) dotted transparent;
        border-bottom: pxToRem(5px) dotted transparent;
        border-left: pxToRem(6px) solid #fff;
      }
    }
    & .direct-img {
      display: block;
      float: left;
      width: pxToRem(113px);
      height: pxToRem(74px);
      margin-right: pxToRem(18px);
    }
    .direct-content {
      height: pxToRem(74px);
      float: left;
      width: pxToRem(205px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .direct-name {
        font-size: pxToRem(17px);
        text-align: left;
      }
      .direct-tips {
        padding-top: pxToRem(9.5px);
        font-size: pxToRem(12px);
        color: rgb(153, 153, 153);
        b {
          font-size: pxToRem(8px);
          position: relative;
          padding: pxToRem(1px) pxToRem(2px);
          right: pxToRem(2px);
          border-radius: 2px;
          border: 1px solid rgb(0, 160, 233);
          color: rgb(0, 160, 233);
        }
        span {
          float: right;
        }
      }
    }
  }
  .box-more {
    width: 100%;
    height: pxToRem(47.5px);
    border-top: 1px solid rgb(232, 232, 232);
    line-height: pxToRem(47.5px);
    font-size: pxToRem(12px);
    text-align: center;
    span:after {
      content: "";
      display: inline-block;
      position: relative;
      left: pxToRem(5px);
      top: pxToRem(-1px);
      width: pxToRem(7px);
      height: pxToRem(7px);
      background-image: url("../images/after/jinr.png");
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>