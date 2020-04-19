<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    let token = window.localStorage.token;
    if (token) this.$store.commit("user/login_saveToken", token);
  }
};
</script>
