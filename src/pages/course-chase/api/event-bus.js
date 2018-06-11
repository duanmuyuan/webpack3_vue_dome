/**
 * 中转事件总线
 */
import Vue from 'vue';

const eventBus = new Vue({
  data: {
    roomInfo: {},
  },
});

export default eventBus;
