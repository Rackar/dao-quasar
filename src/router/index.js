import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    // scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    scrollBehavior(to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(savedPosition || { x: 0, y: 0 });
        }, 50);
      });
    },
  });
  // Router.beforeEach((to, from, next) => {
  //   console.log(to, from);
  //   if (to.name === 'group' && from.name === 'articles') {
  //   }
  //   next();
  // });

  return Router;
}
