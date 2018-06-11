import 'babel-polyfill';
import Vue from 'vue';
import 'mint-ui/lib/style.css';
import store from './views/store.js';
import router from './views/router.js';
import './style.scss';
import '../../plugins/flexble.js';
new Vue({
  el: '#app',
  store,
  router,
});
