<template>
  <div id="q-app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import myIcons from 'src/statics/icon';
export default {
  name: 'App',
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
    this.$q.iconMapFn = iconName => {
      const icon = myIcons[iconName];
      if (icon !== void 0) {
        return { icon: `img:statics/icons/${icon}` };
      }
    };
  },
  mounted() {},

  methods: {
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
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
};
</script>

<style>
</style>