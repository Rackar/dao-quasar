import { Router } from '@/boot/router';
import store from '@/store/index';

const mixin = {
  mounted() {
    const isLoggedIn = store.state.user.userid !== '';
    if (!isLoggedIn) {
      Router.replace('/login');
    }
  },
};

export default mixin;