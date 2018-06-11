import Vue from 'vue';
import bridge from 'ng-bridge';

export default Vue.extend({
  template: require('./index.html'),
  data() {
    return {

    };
  },
  mounted() {
    console.log();
  },
  methods: {
    telPhone(tel) {
      bridge.telPhone(tel);
    },
  },
});
