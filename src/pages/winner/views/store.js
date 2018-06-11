import Vue from 'vue';
import Vuex from 'vuex';
import Cookie from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    validtime: '',
    usertoken: '',
    notAudit: false,
    notThrough: false,
    isLive: false,
    courseid: ''
  },
  mutations: {
    SET_VALID_TIME(state, time) {
      state.validtime = time;
    },
    SET_USERTOKEN(state, token) {
      state.usertoken = token;
      Cookie.set('usertoken', token);
    },
    SET_NOT_AUDIT(state, status) {
      state.notAudit = status;
    },
    SET_NOT_THROUGH(state, status) {
      state.notThrough = status;
    },
    SET_LIVE(state, status) {
      state.isLive = status;
    },
    SET_COURSE_ID(state, id) {
      state.courseid = id;
    },
  }
});
