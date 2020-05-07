<template>
  <q-layout view="lHR lpR fFf" class="main">
    <div class="header">
      <headerbar />
    </div>

    <q-page-container class="page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import headerbar from 'components/headerBar';
export default {
  name: 'PersonLayout',
  components: {
    headerbar,
  },
  data() {
    return {};
  },
};
</script>
<style lang="stylus" scoped>
.header {
  background-color: #74D2C8;
  padding-top: 20px;
  padding-bottom: 80px;
}

.main {
  background-color: rgb(248, 248, 248);
}
</style>
