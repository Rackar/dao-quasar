import Vue from 'vue';
import store from '@/store/index';

const onClick = function(event) {
  const isLoggedIn = store.state.user.userid !== '';
  if (!isLoggedIn) {
    event.preventDefault();
    const customEvent = new CustomEvent('showLoginDialog');
    window.dispatchEvent(customEvent);
  }
};

Vue.directive('require-login-click', {
  inserted(elem) {
    elem.addEventListener('click', onClick, true);
  },
  unbind(elem) {
    elem.removeEventListener('click', onClick);
  },
});
