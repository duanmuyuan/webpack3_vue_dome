import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './home.vue';
import LiveList from './LiveList.vue';
import LiveListDetail from './LiveListDetail.vue';
import PoolList from './PoolList.vue';
import CompanyList from './companyList.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/live-list', component: LiveList },
  { path: '/live-list-detail', component: LiveListDetail },
  { path: '/pool-list', component: PoolList },
  { path: '/company-list', component: CompanyList }
];

const router = new VueRouter({
  routes
});

export default router;
