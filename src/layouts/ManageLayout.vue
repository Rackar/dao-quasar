<template>
  <q-layout view="hHr lpR fFf">
    <div class="q-pa-md">
      <headerBarLeft />
    </div>

    <q-drawer show-if-above v-model="right" side="right" bordered :width="480">
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
