import VueRouter from 'vue-router';

import index from './../tpl/index';
import list from './../tpl/list';

export default function routeConfig() {
  const router = new VueRouter({
    base: __dirname, // 这个很重要
    routes: [{
      path: '*',
      component: index,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true, // 不需要缓存
      },
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: {
        keepAlive: true, // 需要缓存
      },
    }],
  });
  // 路由处理
  router.beforeEach((to, from, next) => {
    next();
  });
  return router;
}
