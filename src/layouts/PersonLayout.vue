<template>
  <q-layout view="lHR lpR fFf" class="person-main">
    <div class="header">
      <headerBarLeft />
      <headerBarRight class="right" />
    </div>

    <q-page-container class="page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import headerbar from 'components/headerBar';
import headerBarLeft from 'components/headerBarLeft';
import headerBarRight from 'components/headerBarRight';
export default {
  name: 'PersonLayout',
  components: {
    headerBarLeft,
    headerBarRight,
  },
  data() {
    return {};
  },
};
</script>
<style lang="stylus" scoped>
.header {
  background-color: #74D2C8;
  display: flex;
  padding: 0px 0px 80px;
  justify-content: space-between;
}

.right {
  position: absolute;
  top: 28px;
  right: 48px;
}

.page {
  // background-color: rgb(248, 248, 248);
}
.person-main{
  background-color: #f8f8f8;
}
</style>
