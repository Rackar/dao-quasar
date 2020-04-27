<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    let token = window.localStorage.token;
    if (token) {
      this.$store.commit('user/login_saveToken', token);
      this.getMyUserinfo();
    }
  },
  methods: {
    async getMyUserinfo() {
      let url = '/protected/user/me';
      const resData = await this.$axios.get(url);
      if (resData.data.code === 0) {
        this.userinfo = resData.data.data.me;
        this.$store.commit('user/setUserinfo', this.userinfo);
      }
    },
  },
};
</script>
