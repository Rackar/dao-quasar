<template>
  <q-layout view="lHR lpR fFf" class="main">
    <headerbar />
    <q-page-container>
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
<style lang="stylus" scoped></style>
