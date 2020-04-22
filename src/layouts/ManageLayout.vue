<template>
  <q-layout view="hHr lpR fFf">
    <div class="q-pa-md">
      <headerBarLeft />
    </div>

    <q-drawer show-if-above v-model="right" side="right" bordered :width="480">
      <groupManage />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import headerBarLeft from 'components/headerBarLeft';
import groupManage from 'pages/manage/group';
export default {
  name: 'ManageLayout',
  components: { groupManage, headerBarLeft },
  data() {
    return {
      right: false,
    };
  },
};
</script>
