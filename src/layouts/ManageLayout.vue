<template>
  <q-layout view="hHr lpR fFf">
    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-avatar rounded size="20px">
        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
      </q-avatar>
      <span class="text-weight-bold">DAOChat官方讨论组</span>

      <groupManage />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import groupManage from 'pages/manage/group';
export default {
  name: 'ManageLayout',
  components: { groupManage },
  data() {
    return {
      right: false,
    };
  },
};
</script>
