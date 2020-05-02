<template>
  <q-layout view="hHr lpR fFf" class="main">
    <div class="q-pa-md">
      <headerBarLeft />
    </div>

    <q-drawer elevated v-model="right" side="right" :width="480" :breakpoint="780">
      <ManageGroup />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import headerBarLeft from 'components/headerBarLeft';
import ManageGroup from 'pages/manage/ManageGroup';
export default {
  name: 'ManageLayout',
  components: { ManageGroup, headerBarLeft },
  data() {
    return {
      right: false,
    };
  },
};
</script>
<style lang="stylus" scoped>
.main {
  background-color: rgb(248, 248, 248);
}
</style>
