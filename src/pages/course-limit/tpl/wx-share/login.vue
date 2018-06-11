<template>
  <div class="container-pane">
    <div class="nav-pane">
      <img src="./../../images/wxs-nav.png" alt="">
      <p @click="popupVisible = true">助力好友延长试用期+注册获取抓涨停神器= 双赢</p>
    </div>
    <div class="login-phone">
        <mt-field class="marp" placeholder="请输入您的手机号码" :attr="{ maxlength: 11 }" type="tel" v-model="telphone"></mt-field>
        <mt-field class="marp" placeholder="请输入验证码" v-model="captcha">
          <div class="btnCode">
            <button @click="getCode" class="border-ios" :disabled="!codeBtn" :class="{active: codeBtn}">{{codeMsg}}</button>
            </div>
        </mt-field>
        <p class="btnLogin" @click="phoneLogin"><img src="./../../images/wx-log.png" alt=""></p>
        <p class="prompt">点击注册则同意<a href="https://m.niuguwang.com/views/agreement/ng-reg.html">《牛股王用户协议》</a></p>
    </div>
    <div class="step-pane">
      <h4>如何获得抓涨停神器更多服务期？</h4>
      <h6> 下载牛股王APP参加活动三步走！</h6>
      <div class="step-item">
        <div class="item">
          <div class="num-item">1</div>
          <p>下载牛股王解锁其他4只牛股</p>
        </div>
        <div class="item">
            <div class="num-item">2</div>
            <p>邀请3名好友注册，延长期限至7天</p>
          </div>
          <div class="item">
            <div class="num-item">3</div>
            <p>邀请5名好友注册，延长期限至30天</p>
          </div>
      </div>
      <!-- <div class="time-pane border-ios">需要在<span>23时59分59秒</span>内完成邀请任务哦！</div> -->
    </div>
    <div class="agreement">
      <h6><span>活动规则</span></h6>
      <div class="agr-item">
        <div>1、</div>
        <div>分享本活动页面即可免费获得价值990元的“涨停先知”1天使用权限。</div>
      </div>
      <div class="agr-item">
        <div>2、</div>
        <div>通过本活动邀请3名好友注册牛股王，可延长至7天使用权；</div>
      </div>
      <div class="agr-item">
        <div>3、</div>
        <div>通过本活动邀请5名好友注册牛股王，可延长至30天使用权；</div>
      </div>
      <div class="agr-item">
        <div>4、</div>
        <div>被邀请好友也可免费获得“涨停先知”使用权限。</div>
      </div>
      <div class="agr-item">
        <div>5、</div>
        <div>只获得1天权限的用户，起始日期从交易日开始计算。（遇节假日顺延）</div>
      </div>
      <div class="agr-item">
        <div>6、</div>
        <div>活动期限：4月9日——4月27日；</div>
      </div>
      <div class="agr-item">
        <div>7、</div>
        <div>活动最终解释权归牛股王所有。</div>
      </div>
    </div>
    <mt-popup class="bg-tspt" v-model="popupVisible">
      <div class="mark-pane">
        <p>您已获得涨停先知试用权限<br/>查看今日牛股</p>
        <div class="btnpane">
          <div class="cancel" @click="popupVisible = false">取消</div>
          <div class="confirm" @click="immediateUse">去使用（{{second}}s）</div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import { Toast, Field, MessageBox, Popup } from 'mint-ui';
import API from "../../api/api.js";
import Download from '../../../../plugins/downcom';
import { setTimeout, setInterval, clearInterval } from 'timers';

Vue.component(Toast.name, Toast);
Vue.component(Field.name, Field);
Vue.component(Popup.name, Popup);

export default {
  data() {
    return {
      telphone: '',
      captcha: '',
      codeBtn: false,
      codeMsg: '获取验证码',
      popupVisible: false,
      second: 2,
      utken: '',
      times: null,
    };
  },
  watch: {
    telphone(val) {
      if (val.length === 11) {
        if (!(/^1[34578]\d{9}$/.test(val))) {
          this.codeBtn = false;
          Toast('手机号码有误！');
        } else {
          this.codeBtn = true;
        }
      } else {
        this.codeBtn = false;
      }
    },
    popupVisible(val) {
      if (val) {
        console.log(val);
        this.times = setInterval(() => {
          if (this.second) {
            this.second -= 1;
          } else {
            this.immediateUse();
            clearInterval(this.times);
          }
        }, 1000);
      } else {
        window.location.reload();
        clearInterval(this.times);
      }
    },
  },
  mounted () {
    
  },
  methods: {
    getCode() {
      API.getCode({
        mobile: this.telphone,
        smsType: 29,
      }).then((res) => {
        if (res.code === 0) {
          this.loading();
        } else {
          Toast(res.message);
        }
      });
    },
    loading() {
      let time = 60;
      this.codeMsg = `${time}S`;
      this.codeBtn = false;
      const timer = setInterval(() => {
        if (time > 0) {
          time -= 1;
          this.codeMsg = `${time}S`;
        } else {
          this.codeBtn = true;
          this.codeMsg = '重新获取验证码';
          clearInterval(timer);
        }
      }, 1000);
    },
    phoneLogin() {
      if (!this.telphone || !(/^1[34578]\d{9}$/.test(this.telphone))) {
        Toast('请输入正确的手机号码！');
        return;
      }
      if (!this.captcha) {
        Toast('请输入验证码！');
        return;
      }
      API.mobileLogin({
        mobile: this.telphone,
        code: this.captcha,
      }).then((res) => {
        Toast(res.message);
        if (res.code === 0) {
          this.utken = res.userInfo.userToken;
          sessionStorage.setItem('utoken', res.userInfo.userToken);
          if (res.userInfo.isRegister) {
            this.wxShareRegister(res.userInfo.userToken);
          } else {
            MessageBox({
              title: '提示',
              message: '您已经注册过牛股王APP<br/>请打开App 参加活动',
              confirmButtonText: '打开牛股王',
              showCancelButton: false,
              closeOnClickModal: true,
            }).then(action => {
              Download.download();
            });
          }
        }
      });
    },
    immediateUse() {
      API.registerPromotion({
        usertoken: this.utken,
      }).then((res) => {
        Toast(res.message);
        if (res.code === 200) {
          window.location.reload();
        }
      });
    },
    wxShareRegister(utk) {
      API.wxShareRegister({
        code: API.getUrlParam('code'),
        usertoken: utk,
      }).then((res) => {
        console.log(res);
        this.popupVisible = true;
      });
    },
  },
}
</script>
