import Vue from 'vue';
import store from '@/store/index';

import LoginDialog from '@/plugins/login/Dialog';
let ComponentClass = Vue.extend(LoginDialog);
let instance;

LoginDialog.install = function() {
  instance = new ComponentClass({
    data: { showLogin: false },
  }).$mount();

  // document.body.appendChild(instance.$el);
  const onClick = function(event) {
    const isLoggedIn = store.state.user.userid !== '';
    if (!isLoggedIn) {
      event.preventDefault();
      instance.showLogin = true;
    }
  };

  const showLogin = () => {
    instance.showLogin = true;
  };

  Vue.prototype.$showLogin = showLogin;

  Vue.directive('require-login-click', {
    inserted(elem) {
      elem.addEventListener('click', onClick, true);
    },
    unbind(elem) {
      elem.removeEventListener('click', onClick);
    },
  });
};
Vue.use(LoginDialog);
