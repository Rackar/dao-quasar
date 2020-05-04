import Vue from 'vue';
import store from '@/store/index';

import LoginDialog from '@/pages/login/Dialog';
var ComponentClass = Vue.extend(LoginDialog);

// pass nothing
// this.$refs.container.appendChild(instance.$el)

const onClick = function(event, elem) {
  const isLoggedIn = store.state.user.userid !== '';
  if (!isLoggedIn) {
    event.preventDefault();
    var instance = new ComponentClass({ propsData: { value: true } });
    instance.$mount();
    elem.appendChild(instance.$el);
    // const customEvent = new CustomEvent('showLoginDialog');
    // window.dispatchEvent(customEvent);
  }
};

Vue.directive('require-login-click', {
  inserted(elem) {
    elem.addEventListener(
      'click',
      e => {
        onClick(e, elem);
      },
      true
    );
  },
  unbind(elem) {
    elem.removeEventListener('click', onClick);
  },
});
