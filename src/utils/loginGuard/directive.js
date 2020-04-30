import Vue from 'vue';
import { Dialog } from 'quasar';
import store from '@/store/index';
import { Router } from '@/boot/router';

// 点击绑定的元素时，如果未登录，会 alert 配置的 title 和 message。 用户确认后会跳转到 login 页。

const onClick = function(event, title, message) {
  const isLoggedIn = store.state.user.userid !== '';
  if (!isLoggedIn) {
    event.preventDefault();
    Dialog.create({
      title,
      message,
    }).onOk(() => {
      Router.push('/login');
    });
  }
};

Vue.directive('require-login-click', {
  inserted(elem, binding) {
    const value = (() => {
      if (!binding.value) return {};
      return binding.value;
    })();
    const { title = '需要登录才能继续操作', message = '' } = value;
    elem.addEventListener('click', () => onClick(event, title, message), true);
  },
  unbind(elem) {
    elem.removeEventListener('click', onClick);
  },
});
