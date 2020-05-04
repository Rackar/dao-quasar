<template>
  <div id="q-app">
    <router-view v-if="isRouterAlive" />
    <LoginDialog v-model="shouldShowLoginDialog"/>
  </div>
</template>

<script>
import './utils/loginGuard/directive';
import LoginDialog from '@/pages/login/Dialog';

export default {
  name: 'App',
  components: { LoginDialog },
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  created() {
    let token = window.localStorage.token;
    if (token) {
      this.$store.commit('user/login_saveToken', token);
      this.getMyUserinfo();
    }
  },
  mounted() {
    window.addEventListener('showLoginDialog', this.showLoginDialog);
  },
  unmounted() {
    window.removeEventListener('showLoginDialog');
  },
  methods: {
    showLoginDialog() {
      this.shouldShowLoginDialog = true;
    },
    async getMyUserinfo() {
      let url = '/protected/user/me';
      const resData = await this.$axios.get(url);
      if (resData.data.code === 0) {
        this.userinfo = resData.data.data.me;
        this.$store.commit('user/setUserinfo', this.userinfo);
      }
    },
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
  },
  data() {
    return {
      shouldShowLoginDialog: false,
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
};
</script>

<style>
  button {
    position: fixed;
    z-index: 99999;
    font-size: 100px;
  }
</style>