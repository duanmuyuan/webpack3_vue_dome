import Vue from 'vue';
import AfterView from '../after/index';
import BeforeView from '../before/index';


export default Vue.extend({
  template: require('./index.html'),
  data() {
    return {
    };
  },
  components: {
    BeforeView,
    AfterView,
  },
  mounted() {
  },
  methods: {
  },
});
